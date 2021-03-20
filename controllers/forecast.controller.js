const sql = require('mssql');
const config = require('../mssql.utils');
const WMWeekServices = require('../services/wm-week.service');
const ForecastServices = require('../services/forecast.service');
const HistoricalServices = require('../services/historical.service');

async function getItemForecast(itemID){
    // Check that the number of future weeks is 52.
    // if the number is less than 52 --> create the needed future weeks
        // check how many weeks are needed.
        // create a loop to produce that many weeks
        // build each week
        // submit each week to the DB via SQL
    let numberOfCalWeeks = await WMWeekServices.getFutureWMWeeksCount();
    if (numberOfCalWeeks < 52) {
        await WMWeekServices.buildNeededWeeks(numberOfCalWeeks);
    }
    // if the number IS 52, check to that the item forecast has 52 weeks
        // if the item forecast has less than 52 weeks --> create the needed weeks
            // check how many weeks are needed.
            // create a loop to produce that many weeks
            // build each week
            // submit each week to the DB via SQL
  
    let numberOfForecastWeeks = await ForecastServices.getUpcomingForecastCount(itemID);
    if (numberOfForecastWeeks < 52) {
        await ForecastServices.addToForecast(itemID);
    }

    // if the number of future WMWeek = 52 AND Forecast weeks = 52 --> return the forecast. 
    let itemForecast = await ForecastServices.getItemForecast(itemID);
    return itemForecast;
}

async function getHistoricalData(ItemID){
    let itemHistory = await HistoricalServices.getItemHistory(ItemID);
    return itemHistory;
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