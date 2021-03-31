const sql = require('mssql');
const config = require('../mssql.utils');

async function getAllClients() {
    try {
        let pool = await sql.connect(config);
        let items = await pool.request().query('SELECT * FROM Client ORDER BY ClientName');
        return items.recordsets[0];
    }
    catch (error) {
        console.log(error);
    }
}

async function getClientBrands(clientID) {
    try {
        let pool = await sql.connect(config);
        let items = await pool.request()
            .input('IdParam', sql.Int, clientID)
            .query('SELECT * FROM Brand WHERE ClientID = @IdParam ORDER BY BrandName');
        return items.recordsets[0];
    }
    catch (error) {
        console.log(error);
    }
}

async function getClientProfiles(clientID) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('ClientID', sql.Int, clientID)
            .query('SELECT * FROM SeasonalProfile WHERE ClientID = @ClientID ORDER BY ProfileName');
        return item.recordsets[0];
    }
    catch (error) {
        console.log(error);
    }
}
async function createNewClient(clientName) {
    try {
        let pool = await sql.connect(config);
        let insertClient = await pool.request()
            .input('ClientName', sql.VarChar, clientName)
            .query('INSERT INTO Client (ClientName) ' +
                'OUTPUT inserted.ClientID ' +
                'VALUES (@ClientName)');
        return insertClient.recordset[0].ClientID;
    }
    catch (error) {
        console.log(error);
    }
}



module.exports = {
    getAllClients: getAllClients,
    getClientBrands: getClientBrands,
    getClientProfiles: getClientProfiles,
    createNewClient: createNewClient
}