const sql = require('mssql');
const config = require('../mssql.utils');
const ClientServices = require('../services/client.service');
const WMWeekServices = require('../services/wm-week.service');
const ForecastServices = require('../services/forecast.service');
const ItemServices = require('../services/item.service');
const ProfileServices = require('../services/profile.service');
const GeneralServices = require('../services/general.service');
const HistoricalServices = require('../services/historical.service');


// GET all the clients from the client table

async function getClientList() {
    let fullClientList = await ClientServices.getAllClients();
    return fullClientList;
}

// GET all the brands belonging to one client
async function getBrandList(ClientID) {
    let clientBrands = await ClientServices.getClientBrands(ClientID);
    return clientBrands;
}

// GET all of the products belonging to one client
async function getProductList(ClientID) {
    let itemList = await ItemServices.getCompleteItemList(ClientID);
    let profileNames = await ProfileServices.getClientProfiles(ClientID);
    return [itemList, profileNames];
}

// GET all profiles belonging to one client
async function getProfileList(ClientID) {
    let profileNames = await ProfileServices.getClientProfiles(ClientID);
    return profileNames;
}

// GET all available product categories
async function getProductCategories() {
    let productCategories = await GeneralServices.getAllProductCategories();
    return productCategories;
}

// GET all available product groups
async function getProductGroups() {
    let productGroups = await GeneralServices.getAllProductGroups();
    return productGroups;
}

// GET the historical data for an item
async function getHistoricalData(itemID) {
    let historicalData = await HistoricalServices.getItemHistory(itemID);
    return historicalData;
}

// Get all the data needed to assist adding a new item/product to a client's product list
async function addItemGetter(ClientID) {
    let clientBrands = await ClientServices.getClientBrands(ClientID);
    let productCategories = await GeneralServices.getAllProductCategories();
    let productGroups = await GeneralServices.getAllProductGroups();
    let seasonalProfile = await ClientServices.getClientProfiles(ClientID);
    return [clientBrands, productCategories, productGroups, seasonalProfile];
}


async function getItemForecast(itemID) {
    /*
        1. Get the current WM_Year.
        2. Check if the current WM_Year has 52 weeks.
        3. If the number of weeks is 52, go to the next check.
        4. If the number of weeks is LESS THAN 52, CREATE the needed weeks.
            a. Check how many Total weeks are needed.
            b. Build a loop to produce that number of weeks.
            c. Build each week.
            d. Submit each week to the DB.
    */

    let currentWeek = await WMWeekServices.getCurrentWeek();
    let currentWM_Year = currentWeek.WM_Year;
    //let currentWMWeekNum = currentWeek.WM_WeekNum;
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
        2. Check if the forecast has 52 weeks.
        3. If the number of forecast weeks is LESS THAN 52, check for an item history
        4. If the item HAS a history:
            a. Check how many weeks are needed.
            b. Build a loop to produce that number of weeks.
            c. Build each week.
            d. Submit each week to the DB.
        5. If the item DOES NOT HAVE a history (i.e. a new product)
            a. Continue. The forecast should have been build when the new item was entered
    */
    let itemHistory = HistoricalServices.getItemHistory(itemID)
    let numberOfForecastWeeks = await ForecastServices.getForecastCount(itemID, currentWM_Year);
    if (itemHistory && numberOfForecastWeeks < 52) {
        await ForecastServices.addToForecast(itemID, numberOfForecastWeeks);
    }

    // if the number of future WMWeek = 52 AND Forecast weeks = 52 --> return the forecast. 
    let itemForecast = await ForecastServices.getItemForecast(itemID);
    return itemForecast;
}


module.exports = {
    getClientList: getClientList,
    getBrandList: getBrandList,
    getProductList: getProductList,
    getProfileList: getProfileList,
    getProductCategories: getProductCategories,
    getProductGroups: getProductGroups,
    getHistoricalData: getHistoricalData,
    getItemForecast: getItemForecast,
    addItemGetter: addItemGetter
}