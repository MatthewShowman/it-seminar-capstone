const sql = require('mssql');
const config = require('../mssql.utils');

async function getFullProfile(groupingDigit) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('GroupingDigit', sql.Int, groupingDigit)
            .query('SELECT * FROM SeasonalProfile WHERE GroupingDigit = @GroupingDigit ORDER BY WeekNum');
        return item.recordsets[0];
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getFullProfile : getFullProfile
}