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
    let itemVelocity = await HistoricalServices.getVelocity(itemID,'');
    let currentWMWeek = await WMWeekServices.getCurrentWeek();
    let proxyForecast = baseForecastBuilder(itemID, currentWMWeek.WMWeekCode, itemVelocity, lastHistoricalRecord.ItemPrice, lastHistoricalRecord.POS_Stores, );
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

async function addToForecast(itemID) {
    let lastAvailableForecast = await getLastForecast(itemID);

    if (!lastAvailableForecast) {
        lastAvailableForecast = await createForecastFromHistorical(itemID)
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

async function buildNewForecast(forecastParams) {
    let itemID = forecastParams.ItemID
    let currentWMWeek = await WMWeekServices.getCurrentWeek();
    let itemVelocity = await HistoricalServices.getVelocity(itemID, forecastParams.targetYear);
    let initialPrice = forecastParams.price;
    let initialStores = forecastParams.stores;
    let leadTime = forecastParams.leadTime;

    let newBaseForecast = baseForecastBuilder(itemID, currentWMWeek.WMWeekCode, itemVelocity, initialPrice, initialStores, leadTime);

    currentWMWeekCode = currentWMWeek.WMWeekCode;
    for (i = 0; i < 52; i++) {
        let newForecastRecord = newBaseForecast;
        currentWMWeekCode = WMWeekServices.transitionToNextWeek(currentWMWeekCode);
        newForecastRecord.WMWeekCode = currentWMWeekCode;
        await addForecastRecord(newForecastRecord);
    }
}

async function getItemForecast(itemID) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, itemID)
            .query('SELECT i.ItemID, f.WMWeekCode, w.WM_WeekNum, ' +
                            'f.Velocity, p.SeasonFactor, f.ForecastPrice, f.ForecastStores, ' +
                            'f.LeadTime, f.ItemAdjust, f.FactorAdjust ' +
                    'FROM Forecast f ' +
                        'JOIN ITEM i ON f.ItemID = i.ItemID ' +
                        'JOIN SeasonalProfile s ON i.CurrentProfile = s.ProfileID ' +
                        'JOIN WMWeek w ON f.WMWeekCode = w.WMWeekCode ' +
                        'JOIN ProfileData p ON s.ProfileID = p.ProfileID ' +
                    'WHERE i.ItemID = @IdParam AND w.CalStartDate >= DATEADD(week, -1, GETDATE()) AND p.WeekNum = w.WM_WeekNum ' +
                    'ORDER BY WMWeekCode');
        return item.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUpcomingForecastCount : getUpcomingForecastCount,
    addForecastRecord : addForecastRecord,
    addToForecast : addToForecast,
    buildNewForecast : buildNewForecast,
    getItemForecast : getItemForecast,
    createForecastFromHistorical : createForecastFromHistorical
}