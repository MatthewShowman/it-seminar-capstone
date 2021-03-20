const sql = require('mssql');
const config = require('../mssql.utils');

async function getAllClients() {
    try {
        let pool = await sql.connect(config);
        let items = await pool.request().query('SELECT * FROM Client ORDER BY ClientName')
        return items.recordsets[0];
    }
    catch (error) {
        console.log(error);
    }
}

async function getClientBrands(ClientID) {
    try {
        let pool = await sql.connect(config);
        let items = await pool.request()
            .input('IdParam', sql.Int, ClientID)
            .query('SELECT * FROM Brand WHERE ClientID = @IdParam ORDER BY BrandName')
        return items.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllClients : getAllClients,
    getClientBrands : getClientBrands
}