const sql = require('mssql');
const config = require('../mssql.utils');

async function getAllProductCategories(){
try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .query('SELECT * FROM ProductCategory ORDER BY CatName');
        return item.recordsets[0];
    }
    catch (error) {
        console.log(error);
    }
}

async function getAllProductGroups(){
try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .query('SELECT * FROM ProductGroup ORDER BY GroupName');
        return item.recordsets[0];
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    getAllProductCategories : getAllProductCategories,
    getAllProductGroups : getAllProductGroups
}