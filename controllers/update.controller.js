const sql = require('mssql');
let config = require('../mssql.utils');
const ClientServices = require('../services/client.service');
const ItemServices = require('../services/item.service');
const ForecastServices = require('../services/forecast.service');
const ProfileServies = require('../services/profile.service');


/*
    These attributes can be updated at the item level:
        ItemName
        Brand
        Category
        Group
        Price
        Seasonal Profile
    This function requires the item ID
*/
async function updateItemInfo(itemUpdateObj) {
    let previousItem = await ItemServices.getSingleItem(itemUpdateObj.ItemID);
    await ItemServices.updateItem(itemUpdateObj);
    let updatedItem = await ItemServices.getSingleItem(itemUpdateObj.ItemID);

    if (previousItem[0].DefaultPrice != updatedItem[0].DefaultPrice) {
        await ForecastServices.updateDefaultForecastPrice(itemUpdateObj.ItemID, itemUpdateObj.DefaultPrice);
    }

    return updatedItem[0];
}

/*
    These attributes can be updated at the week level:
        Forecast Price
        Forecast Stores
        Item Adjustment
        Factor Adjustment
        Lead Time
    This function requires the item ID
*/
async function updateItemForecast(forecastUpdateObj) {
    let updatedRecord = await ForecastServices.updateForecast(forecastUpdateObj);
    return updatedRecord[0];
}


module.exports = {
    updateItemInfo: updateItemInfo,
    updateItemForecast: updateItemForecast,
}