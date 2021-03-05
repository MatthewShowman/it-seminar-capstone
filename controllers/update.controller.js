const sql = require('mssql');
let config = require('../mssql.utils');

async function addItem(newItem){ 
    try {
        let pool = await sql.connect(config);
        let insertItem = await pool.request()
            .input('Alias', sql.VarChar, newItem.Alias)
            .input('Sku', sql.VarChar, newItem.Sku)
            .input('SizeOZ', sql.Decimal(10,2), newItem.SizeOZ)
            .input('ItemGroup', sql.VarChar, newItem.ItemGroup)
            .input('Category', sql.VarChar, newItem.Category)
            .input('BrandID', sql.Int, newItem.BrandID)
            .query('INSERT INTO Item (Alias, Sku, SizeOZ, ItemGroup, Category, BrandID) VALUES (@Alias, @Sku, @SizeOZ, @ItemGroup, @Category, @BrandID)');
        return insertItem.recordsets;
    }
    catch (error) {
        console.log(error);
    }
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
    addWeek : addWeek,
    addHistorical : addHistorical
}