const sql = require('mssql');
const config = require('../mssql.utils');
const WMWeekServices = require('../services/wm-week.service');
const ForecastServices = require('../services/forecast.service');


// GET all the clients from the client table
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

// GET all the brands belonging to one client
async function getBrandList(ClientID){
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

// GET all of the products belonging to one client
async function getProductList(ClientID){
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, ClientID)
            .query('SELECT i.ItemID, i.ItemName, i.BrandID, b.BrandName, i.ClientID, c.ClientName, i.CatID, pc.CatName, i.GroupID, pg.GroupName, i.CurrentProfile, p.ProfileName, i.IsCurrentProd FROM Item i JOIN Brand b ON i.BrandID = b.BrandID JOIN Client c ON i.ClientID = c.ClientID JOIN ProductCategory pc ON i.CatID = pc.CatID JOIN ProductGroup pg ON i.GroupID = pg.GroupID JOIN SeasonalProfile p ON i.CurrentProfile = p.ProfileID WHERE i.ClientID = @IdParam');
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