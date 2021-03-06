const sql = require('mssql');
const config = require('../mssql.utils');

async function getHistoricalData(ItemID){
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, ItemID)
            .query('SELECT * FROM Historical h JOIN WM_Date d ON h.WMWeek = d.WMWeek JOIN Item i ON h.itemID = i.itemID WHERE i.itemID = @IdParam AND (d.WMYear BETWEEN YEAR(GETDATE())-3 AND YEAR(GETDATE())-1) ORDER BY d.WMWeek');
        return item.recordsets;
    }
    catch (error) {
        console.log(error);
    }
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
    getAllProfilesForItem : getAllProfilesForItem
}