const sql = require('mssql');
const config = require('../mssql.utils');

async function getHistoricalData(ItemID){
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, ItemID)
            .query('SELECT h.WMWeek, i.Alias, h.UnitCost, h.StoreCount, h.POSQuantity FROM Historical h JOIN Dates d ON h.WMWeek = d.WMWeek JOIN Item i ON h.itemID = i.itemID WHERE i.itemID = @IdParam ORDER BY WMWeek');
        return item.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getHistoricalData : getHistoricalData
}