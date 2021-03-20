const sql = require('mssql');
const config = require('../mssql.utils');

async function getAllBrands() {
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
    getAllBrands : getAllBrands
}