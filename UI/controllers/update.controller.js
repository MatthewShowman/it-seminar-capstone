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

async function updateProfile(profile, profileDataArray) {
    /*
        1. ClientID and a Profile name are needed to complete a SeasonalProfile record
        2. WeekNum and SeasonalFactors for 52 weeks are needed to complete a ProfileData record
            a. Ideally the factors would be the only data and the app could iterate through weeks
            b. Presently I can't guarentee the roder the the front-end is passing back, so....
    */
    await ProfileServies.updateProfile(profile.ProfileID, profile.ProfileName);
    await ProfileServies.updateProfileData(profile.ProfileID, profileDataArray);
    let updatedProfile = await ProfileServies.getSingleProfile(profile.ProfileID);
    let updatedProfileData = await ProfileServies.getSingleProfileData(profile.ProfileID);
    return [updatedProfile, updatedProfileData];
}


module.exports = {
    updateItemInfo: updateItemInfo,
    updateItemForecast: updateItemForecast,
    updateProfile: updateProfile
}