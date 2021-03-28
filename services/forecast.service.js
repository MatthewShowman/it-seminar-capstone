const sql = require('mssql');
const config = require('../mssql.utils');
const ProfileServices = require('../services/profile.service');
const WMWeekServices = require('../services/wm-week.service');
const HistoricalServices = require('../services/historical.service');

// Helper functions
 function baseForecastBuilder(itemID, week, velocity, price, stores, leadTime) {
    let newBaseForecast = {
        "ItemID" : itemID,
        "WMWeekCode" : week,
        "Velocity" : velocity,
    };

    if (price >= 0.01) {
        newBaseForecast.ForecastPrice = price;
    } else {
        newBaseForecast.ForecastPrice = 1.00;
    }

    if (stores >= 1) {
        newBaseForecast.ForecastStores = stores;
    } else {
        newBaseForecast.ForecastStores = 0;
    }

    if (leadTime >= 0) {newBaseForecast.LeadTime = leadTime}

    return newBaseForecast;
 }



// Backend Services


async function getTotalForecastCount(itemID){
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, itemID)
            .query('SELECT COUNT(*) AS TotalForecasts FROM ForecastWHERE ItemID = @IdParam');
        return item.recordsets[0][0].TotalForecasts;
    }
    catch (error) {
        console.log(error);
    }
}

async function getUpcomingForecastCount(itemID){
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, itemID)
            .query('SELECT COUNT(*) AS NumberOfForecasts FROM Forecast f JOIN WMWeek w ON f.WMWeekCode = w.WMWeekCode WHERE ItemID = @IdParam AND w.CalStartDate >= DATEADD(week, -1, GETDATE())');
        return item.recordsets[0][0].NumberOfForecasts;
    }
    catch (error) {
        console.log(error);
    }
}

async function getForecastCount(itemID,year){
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, itemID)
            .input('WM_Year', sql.Char, year)
            .query('SELECT COUNT(*) AS NumberOfForecasts FROM Forecast f JOIN WMWeek w ON f.WMWeekCode = w.WMWeekCode WHERE ItemID = @IdParam AND w.WM_Year = @WM_Year');
        return item.recordsets[0][0].NumberOfForecasts;
    }
    catch (error) {
        console.log(error);
    }
}

async function getLastForecast(itemID) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, itemID)
            .query('SELECT TOP 1 * FROM Forecast WHERE ItemID = @IdParam ORDER BY WMWeekCode DESC;');
        return item.recordsets[0][0];
    }
    catch (error) {
        console.log(error);
    }
}

async function createForecastFromHistorical(itemID) {
    let lastHistoricalRecord = await HistoricalServices.getLastItemHistory(itemID);
    let currentWMWeek = await WMWeekServices.getCurrentWeek();
    let WMWeekCodeChar = currentWMWeek.WM_Year + '00';
    let WMWeekCodeInt = Number(WMWeekCodeChar);
    let itemVelocity = await HistoricalServices.getVelocity();
    let proxyForecast = baseForecastBuilder(itemID, WMWeekCodeInt, itemVelocity, lastHistoricalRecord.ItemPrice, lastHistoricalRecord.POS_Stores, );
    return proxyForecast;
}

async function addForecastRecord(newForecastRecord) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('ItemID', sql.Int, newForecastRecord.ItemID)
            .input('WMWeekCode', sql.Int, newForecastRecord.WMWeekCode)
            .input('Velocity', sql.Decimal(3,1), newForecastRecord.Velocity)
            .input('ForecastPrice', sql.Decimal(15,2), newForecastRecord.ForecastPrice)
            .input('ForecastStores', sql.Int, newForecastRecord.ForecastStores)
            .input('LeadTime', sql.Int, newForecastRecord.LeadTime)
            .query('INSERT INTO Forecast (ItemID, WMWeekCode, Velocity, ForecastPrice, ForecastStores, LeadTime) VALUES (@ItemID, @WMWeekCode, @Velocity, @ForecastPrice, @ForecastStores, @LeadTime)');
    }
    catch (error) {
        console.log(error);
    }
}

async function addToForecast(itemID, numberOfForcastWeeks) {
    /*
        Two Options
            1. If a forecast exists, build from existing forecast.
            2. If no forecast exists, build from historical.
        
        Process
        1. Get the last forecast.
        2. If forecast DOES NOT exist, Option 2:
            a. Get the most recent historical week data
            b. Build the base forecast from historical data
            c. Create a forecast for the entire year
        3. If forecast DOES exist, Option 1:
            a. Get the last available forecast
            b. Build the base forecast from forecast data
    */

    let lastAvailableForecast = await getLastForecast(itemID);

    if (!lastAvailableForecast) {
        lastAvailableForecast = await createForecastFromHistorical(itemID);
    }

    let lastForecastWMWeekCode = lastAvailableForecast.WMWeekCode;
    let lastWMWeek = await WMWeekServices.getLastFutureWeek();
    let maxWMWeekCode = lastWMWeek.WMWeekCode;
    
    while (lastForecastWMWeekCode < maxWMWeekCode) {
        let newForecastRecord = lastAvailableForecast;
        lastForecastWMWeekCode = WMWeekServices.transitionToNextWeek(lastForecastWMWeekCode);
        newForecastRecord.WMWeekCode = lastForecastWMWeekCode;
        await addForecastRecord(newForecastRecord);
    }
}

async function addNewItemForecast(newItemObj) {
    let currentWMWeek = await WMWeekServices.getCurrentWeek();
    let currentWMWeekCode = currentWMWeek.WMWeekCode;
    
    let newBaseForecast = baseForecastBuilder(newItemObj.ItemID, currentWMWeekCode, 1.0 , newItemObj.ForecastPrice, newItemObj.ForecastStores, newItemObj.LeadTime);

    for (i = currentWMWeek.WM_WeekNum; i <= 52; i++) {
        let newForecastRecord = newBaseForecast;
        await addForecastRecord(newForecastRecord);
        currentWMWeekCode = WMWeekServices.transitionToNextWeek(currentWMWeekCode);
        newForecastRecord.WMWeekCode = currentWMWeekCode;
    }
}

async function getItemForecast(itemID) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, itemID)
            .query('DECLARE @WM_Year CHAR(4) ' +
                    'SET @WM_Year = (SELECT WM_Year FROM WMWeek WHERE CalStartDate ' +
                                    'BETWEEN DATEADD(week,-1,GETDATE()) AND GETDATE()) '+
                    'SELECT i.ItemID, f.WMWeekCode, w.WM_WeekNum, ' +
                            'f.Velocity, p.SeasonFactor, f.ForecastPrice, f.ForecastStores, ' +
                            'f.LeadTime, f.ItemAdjust, f.FactorAdjust ' +
                    'FROM Forecast f ' +
                        'JOIN ITEM i ON f.ItemID = i.ItemID ' +
                        'JOIN SeasonalProfile s ON i.CurrentProfile = s.ProfileID ' +
                        'JOIN WMWeek w ON f.WMWeekCode = w.WMWeekCode ' +
                        'JOIN ProfileData p ON s.ProfileID = p.ProfileID ' +
                    'WHERE i.ItemID = @IdParam AND w.WM_Year = @WM_Year AND p.WeekNum = w.WM_WeekNum ' +
                    'ORDER BY f.WMWeekCode');
        return item.recordsets[0];
    }
    catch (error) {
        console.log(error);
    }
}

async function updateDefaultForecastPrice(itemID, newPrice) {
    let currentWMWeek = await WMWeekServices.getCurrentWeek();

    try {
        let pool = await sql.connect(config);
        let updateItem = await pool.request()
            .input('ItemID', sql.Int, itemID)
            .input('NewPrice', sql.Decimal(15,2), newPrice)
            .input('WMWeekCode', sql.Int, currentWMWeek.WMWeekCode)
            .input('NoFlag', sql.Char, 'N')
            .query('UPDATE Forecast ' +
                    'SET ForecastPrice = @NewPrice ' +
                    'WHERE ItemID = @ItemID AND WMWeekCode >= @WMWeekCode AND PriceUpdateFlag = @NoFlag');
        return updateItem;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    //getUpcomingForecastCount : getUpcomingForecastCount,
    getForecastCount : getForecastCount, //OK
    addForecastRecord : addForecastRecord, //OK
    addToForecast : addToForecast, //OK
    addNewItemForecast : addNewItemForecast,
    getItemForecast : getItemForecast, //OK
    createForecastFromHistorical : createForecastFromHistorical, //OK
    updateDefaultForecastPrice : updateDefaultForecastPrice
}