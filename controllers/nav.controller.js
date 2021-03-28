const sql = require('mssql');
const config = require('../mssql.utils');
const ClientServices = require('../services/client.service');
const ItemServices = require('../services/item.service');
const ProfileServices = require('../services/profile.service');
const GeneralServices = require('../services/general.service');


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

// GET all profiles belonging to one client
async function getProfileList(ClientID){
    let profileNames = await ProfileServices.getClientProfiles(ClientID);
    return profileNames;
}

// GET all available product categories
async function getProductCategories(){
    let productCategories = await GeneralServices.getAllProductCategories();
    return productCategories;
}

// GET all available product groups
async function getProductGroups(){
    let productGroups = await GeneralServices.getAllProductGroups();
    return productGroups;
}

// Get all the data needed to assist adding a new item/product to a client's product list
async function addItemGetter(ClientID){
    let clientBrands = await ClientServices.getClientBrands(ClientID);
    let productCategories = await GeneralServices.getAllProductCategories();
    let productGroups = await GeneralServices.getAllProductGroups();
    let seasonalProfile = await ClientServices.getClientProfiles(ClientID);
    return [clientBrands, productCategories,productGroups, seasonalProfile];
}

module.exports = {
    getClientList : getClientList,
    getBrandList : getBrandList,
    getProductList : getProductList,
    getProfileList : getProfileList,
    getProductCategories: getProductCategories,
    getProductGroups: getProductGroups,
    addItemGetter: addItemGetter
}