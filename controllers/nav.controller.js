const sql = require('mssql');
const config = require('../mssql.utils');


async function getClientList(){
    try {
        let pool = await sql.connect(config);
        let items = await pool.request().query('SELECT * FROM Client ORDER BY ClientName')
        return items.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}


async function getBrandList(ClientID){
    try {
        let pool = await sql.connect(config);
        let items = await pool.request()
            .input('IdParam', sql.Int, ClientID)
            .query('SELECT * WHERE ClientID = @IDParam ORDER BY Brand')
        return items.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}


async function getProductList(ClientID){
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, ClientID)
            .query('SELECT * FROM Item WHERE ClientID = @IdParam ORDER BY Alias');
        return item.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getClientList : getClientList,
    getBrandList : getBrandList,
    getProductList : getProductList
}