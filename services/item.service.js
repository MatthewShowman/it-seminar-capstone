const sql = require('mssql');
const config = require('../mssql.utils');

async function getCompleteItemList(ClientID) {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, ClientID)
            .query('DECLARE @WeekCode INT ' +
                    'SET @WeekCode = (SELECT WMweekCode FROM WMWeek WHERE CalStartDate BETWEEN DATEADD(week,-1,GETDATE()) AND GETDATE()) ' +
                    'SELECT i.ItemID, i.ItemName, i.BrandID, b.BrandName, i.ClientID, c.ClientName, i.CatID, ' +
                        'pc.CatName, i.GroupID, pg.GroupName, i.CurrentProfile, p.ProfileName, i.DefaultPrice, ' +
                        'f.ForecastStores AS CurrentStores, i.IsCurrentProd ' +
                    'FROM Item i ' +
                        'JOIN Brand b ON i.BrandID = b.BrandID ' +
                        'JOIN Client c ON i.ClientID = c.ClientID ' +
                        'JOIN ProductCategory pc ON i.CatID = pc.CatID ' +
                        'JOIN ProductGroup pg ON i.GroupID = pg.GroupID ' +
                        'JOIN SeasonalProfile p ON i.CurrentProfile = p.ProfileID ' +
                        'LEFT JOIN Forecast f ON i.ItemID = f.ItemID AND f.WMWeekCode = @WeekCode ' +
                    'WHERE i.ClientID = @IdParam;');
        return item.recordsets[0];
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCompleteItemList : getCompleteItemList
}