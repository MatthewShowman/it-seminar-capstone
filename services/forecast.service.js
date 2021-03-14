const sql = require('mssql');
const config = require('../mssql.utils');
const ProfileServices = require('../services/profile.service');
const WMWeekServices = require('../services/wm-week.service');

// Helper functions
 function baseForecastBuilder(itemID, week, velocity, price, stores) {
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

    return newBaseForecast;
 }

// Backend Services

async function getUpcomingForecastCount(itemID){
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, itemID)
            .query('SELECT COUNT(*) AS NumberOfForecasts FROM Forecast f JOIN WMWeek w ON f.WMWeekCode = w.WMWeekCode WHERE ItemID = @IdParam AND w.CalStartDate >= DATEADD(week, -3, GETDATE())');
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

async function getVelocity(itemID, year) {
    let targetYear = year;
    if (targetYear == '') {
        let newTargetYear = await WMWeekServices.getCurrentWeek();
        if (newTargetYear.WM_Year == '2021') {
            targetYear = '2019';
        } else {
            let calculatedYear = Number(newTargetYear) - 1;
            targetYear = calculatedYear.toString();
        }
    }

    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, itemID)
            .input('WM_Year', sql.Char, targetYear)
            .query('SELECT CAST ( ROUND(SUM(h.POS_Items * 1.0) / SUM(h.POS_Stores),1) AS DECIMAL(3,1)) AS Velocity FROM Item i JOIN Historical h ON i.ItemID = h.ItemID JOIN WMWeek w ON h.WMWeekCode = w.WMWeekCode WHERE i.ItemID = @IdParam AND w.WM_Year = @WM_Year;');
        let itemVelocity = item.recordsets[0][0].Velocity;
        if (itemVelocity == null) {
            return 1.0;
        } else {
            return itemVelocity;
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function addForecastRecord(newForecastRecord) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('ItemID', sql.Int, newForecastRecord.ItemID)
            .input('WMWeekCode', sql.Int, newForecastRecord.WMWeekCode)
            .input('Velocity', sql.Decimal(3,1), newForecastRecord.Velocity)
            .input('ProfileID', sql.Int, newForecastRecord.ProfileID)
            .input('ForecastPrice', sql.Decimal(15,2), newForecastRecord.ForecastPrice)
            .input('ForecastStores', sql.Int, newForecastRecord.ForecastStores)
            .query('INSERT INTO Forecast (ItemID, WMWeekCode, Velocity, ProfileID, ForecastPrice, ForecastStores) VALUES (@ItemID, @WMWeekCode, @Velocity, @ProfileID, @ForecastPrice, @ForecastStores)');
    }
    catch (error) {
        console.log(error);
    }
}

async function updateForecast(itemID) {
    
    newForecast = {};

    if (currentNumForecasts == 0) {
        let totalHistoricalForecasts = await getTotalForecastCount(itemID);
        if (totalHistoricalForecasts = 0) {
            newForecast.ItemID = itemID;
            newForecast.Velocity = 1.0;
            newForecast.ProfileID = NULL;
            newForecast.ForecastPrice = 1.00;
            newForecast.Forestores = 0;
            newForecast.ItemAdjust = 0

        }
    } else {

    }
    
    
    //let velocityYear = new Date().getFullYear() - 1;
}

async function buildNewForecast(forecastParams) {
    let itemID = forecastParams.ItemID
    let defaultProfile = await ProfileServices.getFullProfile(0);
    let currentWMWeek = await WMWeekServices.getCurrentWeek();
    let itemVelocity = await getVelocity(itemID, forecastParams.targetYear);
    let initialPrice = forecastParams.price;
    let initialStores = forecastParams.stores;

    let newBaseForecast = baseForecastBuilder(itemID, currentWMWeek.WMWeekCode, itemVelocity, initialPrice, initialStores);

    for (i = 0; i < 52; i++) {
        let newForecastRecord = newBaseForecast;
        newForecastRecord.WMWeekCode = WMWeekServices.transitionToNextWeek(currentWMWeek.WMWeekCode);
        newForecastRecord.ProfileID = defaultProfile[i].ProfileID;
        await addForecastRecord(newForecastRecord);
    }
}

module.exports = {
    getUpcomingForecastCount : getUpcomingForecastCount,
    getVelocity : getVelocity,
    addForecastRecord : addForecastRecord,
    updateForecast : updateForecast,
    buildNewForecast : buildNewForecast
}