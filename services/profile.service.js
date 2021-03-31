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

async function createProfile(clientID, profileName) {
    try {
        let pool = await sql.connect(config);
        let newProfile = await pool.request()
            .input('ClientID', sql.Int, clientID)
            .input('ProfileName', sql.VarChar, profileName)
            .query('INSERT INTO SeasonalProfile (ProfileName, ClientID) ' +
                'OUTPUT inserted.ProfileID ' +
                'VALUES (@ProfileName, @ClientID)');
        return newProfile.recordset[0].ProfileID;;
    }
    catch (error) {
        console.log(error);
    }
}

async function createProfileData(profileID, profileDataArray) {
    for (i = 0; i < profileDataArray.length; i++) {
        let weekData = profileDataArray[i];
        try {
            let pool = await sql.connect(config);
            let profileWeek = await pool.request()
                .input('ProfileID', sql.Int, profileID)
                .input('WeekNum', sql.VarChar, weekData.WeekNum)
                .input('SeasonFactor', sql.Decimal(3, 1), weekData.SeasonFactor)
                .query('INSERT INTO ProfileData (ProfileID, WeekNum, SeasonFactor) ' +
                    'VALUES (@ProfileID, @WeekNum, @SeasonFactor)');
        }
        catch (error) {
            console.log(error);
        }
    }
    return true;
}


function createDefaultProfileData(profileID) {
    let profileDataArray = [];

    for (i = 1; i <= 52; i++) {
        dataObj = { "WeekNum": i, "SeasonFactor": 1.0 };
        profileDataArray.push(dataObj);
    }
    return profileDataArray;
}

module.exports = {
    getClientProfiles: getClientProfiles,
    createProfile: createProfile,
    createProfileData: createProfileData,
    createDefaultProfileData: createDefaultProfileData,
}