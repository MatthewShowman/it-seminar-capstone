const sql = require('mssql');
let config = require('../mssql.utils');
const ClientServices = require('../services/client.service');
const ItemServices = require('../services/item.service');
const ForecastServices = require('../services/forecast.service');
const ProfileServies = require('../services/profile.service');


async function addItem(newItemObj){ 
    /*
        Get item details
            1. ItemName
            2. BrandID
            3. ClientID
            4. CatID
            5. GroupID
            6. DefaultPrice
            7. CurrentProfile DEFAULT = No Seasonality
        Set initial Forcast Data
            8. ForecastStores
            9. LeadTime
        Organize the data.
        Add the Item
        Create the forecast
    */
    let newItemID = await ItemServices.createNewItem(newItemObj);
    newItemObj.ItemID = newItemID;

    await ForecastServices.addNewItemForecast(newItemObj);
    return ItemServices.getSingleItem(newItemID);
}


async function createNewProfile(profile, profileDataArray) {
    /*
        1. ClientID and a Profile name are needed to complete a SeasonalProfile record
        2. WeekNum and SeasonalFactors for 52 weeks are needed to complete a ProfileData record
            a. Ideally the factors would be the only data and the app could iterate through weeks
            b. Presently I can't guarentee the roder the the front-end is passing back, so....
    */
    let newProfileID = await ProfileServies.createProfile(profile.ClientID, profile.ProfileName);
    await ProfileServies.createProfileData(newProfileID, profileDataArray);
    return await ProfileServies.getClientProfiles(profile.ClientID);
}


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

    console.log(previousItem[0].DefaultPrice);
    console.log(updatedItem[0].DefaultPrice);

    if (previousItem[0].DefaultPrice != updatedItem[0].DefaultPrice) {
        await ForecastServices.updateDefaultForecastPrice(itemUpdateObj.ItemID, itemUpdateObj.DefaultPrice);
    }

    return updatedItem;
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
    addItem : addItem,
    updateItemInfo : updateItemInfo,
    updateItemForecast :updateItemForecast,
    createNewProfile : createNewProfile
}