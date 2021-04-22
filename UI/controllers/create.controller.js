const sql = require('mssql');
let config = require('../mssql.utils');
const ClientServices = require('../services/client.service');
const ItemServices = require('../services/item.service');
const ForecastServices = require('../services/forecast.service');
const ProfileServies = require('../services/profile.service');


async function addClient(clientName) {
    let newClientId = await ClientServices.createNewClient(clientName);
    let profileID = await ProfileServies.createProfile(newClientId, 'No Seasonality');
    let newDefaultProfile = await ProfileServies.createDefaultProfileData(profileID);
    await ProfileServies.createProfileData(profileID, newDefaultProfile);
    return newClientId;
}


async function addItem(newItemObj) {
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


module.exports = {
    addClient: addClient,
    addItem: addItem,
    createNewProfile: createNewProfile,
}