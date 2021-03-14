const sql = require('mssql');
const config = require('../mssql.utils');
const WMWeekServices = require('../services/wm-week.service');
const ForecastServices = require('../services/forecast.service');

async function getItemForecast(ItemID){
    // Check that the number of future weeks is 52.
    // if the number is less than 52 --> create the needed future weeks
        // check how many weeks are needed.
        // create a loop to produce that many weeks
        // build each week
        // submit each week to the DB via SQL
    // if the number IS 52, check to that the item forecast has 52 weeks
        // if the item forecast has less than 52 weeks --> create the needed weeks
            // check how many weeks are needed.
            // create a loop to produce that many weeks
            // build each week
            // submit each week to the DB via SQL
        // if the number IS 52 --> return the forecast.
    let numberOfCalWeeks = await WMWeekServices.getFutureWMWeeksCount();
    if (numberOfCalWeeks < 52) {
        await WMWeekServices.buildNeededWeeks(numberOfCalWeeks);
    }
    
    let numberOfForecastWeeks = await ForecastServices.getUpcomingForecastCount(ItemID)
    if (numberOfForecastWeeks < 53) {
        await ForecastServices.updateForecast(ItemID,numberOfForecastWeeks);
    }

    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, ItemID)
            .query('SELECT * FROM WMWeek WHERE CalStartDate >= GETDATE() - 1');
            //.query('SELECT * FROM Forecast f JOIN WMWeek w ON f.WMWeekCode = w.WMWeekCode WHERE f.ItemID = @IdParam AND w.CalStartDate >= G');
        return item.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getHistoricalData(ItemID){
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, ItemID)
            .query('SELECT * FROM Historical h JOIN WM_Date d ON h.WMWeek = d.WMWeek JOIN Item i ON h.itemID = i.itemID WHERE i.itemID = @IdParam AND (d.WMYear BETWEEN YEAR(GETDATE())-3 AND YEAR(GETDATE())-1) ORDER BY d.WMWeek');
        return item.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getItemDefaultProfile(ItemID){
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, ItemID)
            .query('SELECT * FROM SalesProfile WHERE ItemID = @IdParam AND isDefaultProfile = 1');
        return item.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getAllProfilesForItem(ItemID){
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, ItemID)
            .query('SELECT * FROM SalesProfile WHERE ItemID = 1 OR isGeneral = 1');
        return item.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getHistoricalData : getHistoricalData,
    getItemDefaultProfile : getItemDefaultProfile,
    getAllProfilesForItem : getAllProfilesForItem,
    getItemForecast : getItemForecast
}