const sql = require('mssql');
const config = require('../mssql.utils');

async function getClientProfiles(clientID) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, clientID)
            .query('SELECT * FROM SeasonalProfile WHERE ClientID = @IdParam ORDER BY ProfileName');
        return item.recordsets[0];
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getClientProfiles : getClientProfiles
}