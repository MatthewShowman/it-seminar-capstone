const sql = require('mssql');
const config = require('../mssql.utils');
const ClientServices = require('../services/client.service');
const ItemServices = require('../services/item.service');
const ProfileServices = require('../services/profile.service');


// GET all the clients from the client table

async function getClientList(){
    let fullClientList = await ClientServices.getAllClients();
    return fullClientList;
}

// GET all the brands belonging to one client
async function getBrandList(ClientID){
    let clientBrands = await ClientServices.getClientBrands(ClientID);
    return clientBrands;
}

// GET all of the products belonging to one client
async function getProductList(ClientID){
    let itemList = await ItemServices.getCompleteItemList(ClientID);
    let profileNames = await ProfileServices.getClientProfiles(ClientID);
    return [itemList, profileNames];
}

module.exports = {
    getClientList : getClientList,
    getBrandList : getBrandList,
    getProductList : getProductList
}