const sql = require('mssql');
const config = require('../mssql.utils');
const WMWeekServices = require('../services/wm-week.service');
const ForecastServices = require('../services/forecast.service');
const HistoricalServices = require('../services/historical.service');

async function getItemForecast(itemID){
    /*
        1. Get the current WM_Year.
        2. Check if the current WM_Year has 52 weeks.
        3. If the number of weeks is 52, go to the next check.
        4. If the number of weeks is LESS THAN 52, CREATE the needed weeks.
            a. Check how many weeks are needed.
            b. Build a loop to produce that number of weeks.
            c. Build each week.
            d. Submit each week to the DB.
    
    */
    let currentWeek = await WMWeekServices.getCurrentWeek();
    let currentWM_Year = currentWeek.WM_Year;
    let currentWMWeekNum = currentWeek.WM_WeekNum;
    
    let numberOfCalWeeks = await WMWeekServices.getYearWMWeeksCount(currentWM_Year);
    
    if (numberOfCalWeeks < 52) {
        await WMWeekServices.buildNeededWeeks(numberOfCalWeeks);
    }

    if (currentWMWeekNum = 48) {
        let nextWM_YearInt = (currentWM_Year * 1) + 1;
        let nextWM_Year = nextWM_YearInt.toString();
        let numberOfFutureCalWeeks = WMWeekServices.getYearWMWeeksCount(nextWM_Year);
        if (numberOfFutureCalWeeks != 52) {
            await WMWeekServices.buildNeededWeeks(numberOfFutureCalWeeks);
        }
    }

    /*
    1. Get the number of forecasts for the item.
    2. Check if the forcast has 52 weeks.
    3. If the number of forecast weeks is LESS THAN 52, CREATE the needed weeks.
        a. Check how many weeks are needed.
        b. Build a loop to produce that number of weeks.
        c. Build each week.
        d. Submit each week to the DB.
    */

    let numberOfForecastWeeks = await ForecastServices.getForecastCount(itemID, currentWM_Year);
    if (numberOfForecastWeeks < 52) {
        await ForecastServices.addToForecast(itemID, numberOfForecastWeeks);
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