const sql = require('mssql');
const config = require('../mssql.utils');
const ProfileServices = require('../services/profile.service');
const WMWeeksServices = require('../services/wm-week.service');

// Helper functions


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

async function updateForecast(itemID) {
    
    newForecast = {};

    if (currentNumForecasts = 0) {
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

async function buildNewForecast(itemID) {
    
    newForecast = {};

    defaultProfile = ProfileServices.getFullProfile(0);

    if (currentNumForecasts = 0) {
        let totalHistoricalForecasts = await getTotalForecastCount(itemID);
        if (totalHistoricalForecasts = 0) {
            newForecast.ItemID = itemID;
            newForecast.Velocity = 1.0;
            newForecast.ProfileID = NULL;
            newForecast.ForecastPrice = 1.00

        }
    } else {

    }
    
    
    //let velocityYear = new Date().getFullYear() - 1;
}

module.exports = {
    getUpcomingForecastCount : getUpcomingForecastCount,
    updateForecast : updateForecast,
    buildNewForecast : buildNewForecast
}