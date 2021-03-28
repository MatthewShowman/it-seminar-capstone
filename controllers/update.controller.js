const sql = require('mssql');
let config = require('../mssql.utils');
const ClientServices = require('../services/client.service');
const ItemServices = require('../services/item.service');
const ForecastServices = require('../services/forecast.service');
const WMWeekServices = require('../services/wm-week.service');


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

async function addWeek(newWeek){ 
    try {
        let pool = await sql.connect(config);
        let insertWeek = await pool.request()
            .input('WMWeek', sql.VarChar, newWeek.WMWeek)
            .input('FiscalYear', sql.VarChar, newWeek.FiscalYear)
            .input('WeekStart', sql.DateTime, newWeek.WeekStart)
            .input('Month', sql.VarChar, newWeek.Month)
            .input('Season', sql.VarChar, newWeek.Season)
            .query('INSERT INTO Dates (WMWeek, FiscalYear, WeekStart, Month, Season) VALUES (@WMWeek, @FiscalYear, @WeekStart, @Month, @Season)');
        return insertWeek.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function addHistorical(newRecord){
    try {
        let pool = await sql.connect(config);
        let insertHistorical = await pool.request()
            .input('WMWeek', sql.VarChar, newRecord.WMWeek)
            .input('ItemID', sql.Int, newRecord.ItemID)
            .input('UnitCost', sql.Decimal(10,2), newRecord.UnitCost)
            .input('StoreCount', sql.Int, newRecord.StoreCount)
            .input('POSQuantity', sql.Int, newRecord.POSQuantity)
            .query('INSERT INTO Historical (WMWeek, ItemID, UnitCost, StoreCount, POSQuantity) VALUES (@WMWeek, @ItemID, @UnitCost, @StoreCount, @POSQuantity)');
        return insertHistorical.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    addItem : addItem,
    updateItemInfo : updateItemInfo,
    addWeek : addWeek,
    addHistorical : addHistorical
}