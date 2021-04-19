const sql = require('mssql');
const config = require('../mssql.utils');
const WMWeekServices = require('../services/wm-week.service');


async function getItemHistory(itemID) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, itemID)
            .query('SELECT * FROM Historical WHERE ItemID = @IdParam ORDER BY WMWeekCode');
        return item.recordsets[0];
    }
    catch (error) {
        console.log(error);
    }
}

async function getLastItemHistory(itemID) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, itemID)
            .query('SELECT TOP 1 * FROM Historical WHERE ItemID = @IdParam ORDER BY WMWeekCode DESC');
        return item.recordsets[0][0];
    }
    catch (error) {
        console.log(error);
    }
}

async function getVelocity(itemID, year) {
    let currentYear = year;
    let targetYear = '';
    if (currentYear == '2021') {
        targetYear = '2019';
    } else {
        let lastYear = Number(currentYear) - 1;
        targetYear = lastYear.toString();
    }

    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, itemID)
            .input('WM_Year', sql.Char, targetYear)
            .query('SELECT CAST ( ROUND(SUM(h.POS_Items * 1.0) / SUM(h.POS_Stores),1) AS DECIMAL(3,1)) AS Velocity FROM Item i JOIN Historical h ON i.ItemID = h.ItemID JOIN WMWeek w ON h.WMWeekCode = w.WMWeekCode WHERE i.ItemID = @IdParam AND w.WM_Year = @WM_Year;');
        let itemVelocity = item.recordsets[0][0].Velocity;
        if (itemVelocity == null) {
            return 1.0;
        } else {
            return itemVelocity;
        }
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getItemHistory: getItemHistory,
    getLastItemHistory: getLastItemHistory,
    getVelocity: getVelocity
}