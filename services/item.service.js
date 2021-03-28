const sql = require('mssql');
const config = require('../mssql.utils');

async function getCompleteItemList(ClientID) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, ClientID)
            .query('DECLARE @WeekCode INT ' +
                    'SET @WeekCode = (SELECT WMweekCode FROM WMWeek WHERE CalStartDate BETWEEN DATEADD(week,-1,GETDATE()) AND GETDATE()) ' +
                    'SELECT i.ItemID, i.ItemName, i.BrandID, b.BrandName, i.ClientID, c.ClientName, i.CatID, ' +
                        'pc.CatName, i.GroupID, pg.GroupName, i.CurrentProfile, p.ProfileName, i.DefaultPrice, ' +
                        'f.ForecastStores AS CurrentStores, i.IsCurrentProd ' +
                    'FROM Item i ' +
                        'JOIN Brand b ON i.BrandID = b.BrandID ' +
                        'JOIN Client c ON i.ClientID = c.ClientID ' +
                        'JOIN ProductCategory pc ON i.CatID = pc.CatID ' +
                        'JOIN ProductGroup pg ON i.GroupID = pg.GroupID ' +
                        'JOIN SeasonalProfile p ON i.CurrentProfile = p.ProfileID ' +
                        'LEFT JOIN Forecast f ON i.ItemID = f.ItemID AND f.WMWeekCode = @WeekCode ' +
                    'WHERE i.ClientID = @IdParam;');
        return item.recordsets[0];
    }
    catch (error) {
        console.log(error);
    }
}

async function getSingleItem(ItemID) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, ItemID)
            .query('DECLARE @WeekCode INT ' +
                'SET @WeekCode = (SELECT WMweekCode FROM WMWeek WHERE CalStartDate BETWEEN DATEADD(week,-1,GETDATE()) AND GETDATE()) ' +
                'SELECT i.ItemID, i.ItemName, i.BrandID, b.BrandName, i.ClientID, c.ClientName, i.CatID, ' +
                    'pc.CatName, i.GroupID, pg.GroupName, i.CurrentProfile, p.ProfileName, i.DefaultPrice, ' +
                    'f.ForecastStores AS CurrentStores, i.IsCurrentProd ' +
                'FROM Item i ' +
                    'JOIN Brand b ON i.BrandID = b.BrandID ' +
                    'JOIN Client c ON i.ClientID = c.ClientID ' +
                    'JOIN ProductCategory pc ON i.CatID = pc.CatID ' +
                    'JOIN ProductGroup pg ON i.GroupID = pg.GroupID ' +
                    'JOIN SeasonalProfile p ON i.CurrentProfile = p.ProfileID ' +
                    'LEFT JOIN Forecast f ON i.ItemID = f.ItemID AND f.WMWeekCode = @WeekCode ' +
                'WHERE i.ItemID = @IdParam;');
        return item.recordsets[0];
    }
    catch (error) {
        console.log(error);
    }
}


async function createNewItem(newItemJSON) {
    try {
        let pool = await sql.connect(config);
        let insertItem = await pool.request()
            .input('ItemName', sql.VarChar, newItemJSON.ItemName)
            .input('BrandID', sql.VarChar, newItemJSON.BrandID)
            .input('ClientID', sql.Int, newItemJSON.ClientID)
            .input('CatID', sql.Int, newItemJSON.CatID)
            .input('GroupID', sql.Int, newItemJSON.GroupID)
            .input('DefaultPrice', sql.Decimal(6,2), newItemJSON.DefaultPrice)
            .input('CurrentProfile', sql.Int, newItemJSON.CurrentProfile)
            .query('INSERT INTO Item (ItemName, BrandID, ClientID, CatID, GroupID, DefaultPrice, CurrentProfile) ' +
                    'OUTPUT inserted.ItemID ' +
                    'VALUES (@ItemName, @BrandID, @ClientID, @CatID, @GroupID, @DefaultPrice, @CurrentProfile)');
        return insertItem.recordset[0].ItemID;
    }
    catch (error) {
        console.log(error);
    }
}

async function updateItem(ItemInfoObj) {
    try {
        let pool = await sql.connect(config);
        let updateItem = await pool.request()
            .input('ItemID', sql.VarChar, ItemInfoObj.ItemID)
            .input('ItemName', sql.VarChar, ItemInfoObj.ItemName)
            .input('BrandID', sql.VarChar, ItemInfoObj.BrandID)
            .input('CatID', sql.Int, ItemInfoObj.CatID)
            .input('GroupID', sql.Int, ItemInfoObj.GroupID)
            .input('DefaultPrice', sql.Decimal(6,2), ItemInfoObj.DefaultPrice)
            .input('CurrentProfile', sql.Int, ItemInfoObj.CurrentProfile)
            .query('UPDATE Item ' +
                    'SET ItemName = @ItemName, ' +
                        'BrandID = @BrandID, CatID = @CatID, GroupID = @GroupID, ' +
                        'DefaultPrice = @DefaultPrice, CurrentProfile = @CurrentProfile ' +
                    'WHERE ItemID = @ItemID');
        return updateItem;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCompleteItemList : getCompleteItemList,
    getSingleItem : getSingleItem,
    createNewItem : createNewItem,
    updateItem : updateItem
}