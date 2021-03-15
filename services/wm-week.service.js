const sql = require('mssql');
const config = require('../mssql.utils');

// Helper functions

function getWM_Month(WM_WeekNum){
    let setMonth = 0;
    if (WM_WeekNum >= 1 && WM_WeekNum <= 4) { setMonth = 1 }
    else if (WM_WeekNum >= 1 && WM_WeekNum <= 4) { setMonth = 1 } // February has 4 weeks
    else if (WM_WeekNum >= 5 && WM_WeekNum <= 9) { setMonth = 2 } // March has 5 weeks
    else if (WM_WeekNum >= 10 && WM_WeekNum <= 13) { setMonth = 3 } // April has 4 weeks
    else if (WM_WeekNum >= 14 && WM_WeekNum <= 17) { setMonth = 4 } // May has 4 weeks
    else if (WM_WeekNum >= 18 && WM_WeekNum <= 22) { setMonth = 5 } // June has 5 weeks
    else if (WM_WeekNum >= 23 && WM_WeekNum <= 26) { setMonth = 6 } // July has 4 weeks
    else if (WM_WeekNum >= 27 && WM_WeekNum <= 30) { setMonth = 7 } // August has 4 weeks
    else if (WM_WeekNum >= 31 && WM_WeekNum <= 35) { setMonth = 8 } // September has 5 weeks
    else if (WM_WeekNum >= 36 && WM_WeekNum <= 39) { setMonth = 9 } // October has 4 weeks
    else if (WM_WeekNum >= 40 && WM_WeekNum <= 43) { setMonth = 10 } // November has 4 weeks
    else if (WM_WeekNum >= 44 && WM_WeekNum <= 48) { setMonth = 11 } // December has 5 weeks
    else { setMonth = 12 }

    return setMonth;
}

function createNextWeek(oldWeek) {
    let nextWeek = oldWeek;
    if (nextWeek.WM_WeekNum >= 52) {
        nextWeek.WMWeekCode = nextWeek.WMWeekCode + 49;
        nextWeek.WM_WeekNum = nextWeek.WM_WeekNum - 51;
        nextWeek.WM_Year = nextWeek.WMWeekCode.toString().slice(0,4);
    } else {
        nextWeek.WMWeekCode = nextWeek.WMWeekCode + 1;
        nextWeek.WM_WeekNum = nextWeek.WM_WeekNum + 1;
        nextWeek.WM_Year = nextWeek.WM_Year;
    }
    nextWeek.WM_Month = getWM_Month(nextWeek.WM_WeekNum);
    return nextWeek;
}

function transitionToNextWeek(WMWeekCode) {
    let weekPart = WMWeekCode.toString().slice(4,6);
    if (weekPart == '52') {
        return WMWeekCode + 49;
    } else {
        return WMWeekCode +1;
    }
}


// Backend Services

async function getFutureWMWeeksCount(){
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .query('SELECT COUNT(*) AS NumberOfWeeks FROM WMWeek WHERE CalStartDate >= DATEADD(week, -1, GETDATE())');
        return item.recordsets[0][0].NumberOfWeeks;
    }
    catch (error) {
        console.log(error);
    }
}

async function getCurrentWeek() {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .query('SELECT TOP 1 * FROM WMWeek WHERE CalStartDate >= DATEADD(week, -1, GETDATE())');
        return item.recordsets[0][0];
    }
    catch (error) {
        console.log(error);
    }
}

async function getLastFutureWeek() {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .query('SELECT * FROM WMWeek WHERE WMWeekCode = (SELECT MAX(WMWeekCode) FROM WMWeek)');
        return item.recordsets[0][0];
    }
    catch (error) {
        console.log(error);
    }
}

async function updateCalStartDate() {
    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .query('SELECT DATEADD(week,1,CalStartDate) AS NextStartDate FROM WMWeek WHERE WMWeekCode = (SELECT MAX(WMWeekCode) FROM WMWeek)');
        return item.recordsets[0][0].NextStartDate;
    }
    catch (error) {
        console.log(error);
    }
}

async function addWeek(newWeek){ 
    try {
        let pool = await sql.connect(config);
        let insertWeek = await pool.request()
            .input('WMWeekCode', sql.Int, newWeek.WMWeekCode)
            .input('WM_WeekNum', sql.Int, newWeek.WM_WeekNum)
            .input('WM_Year', sql.Char, newWeek.WM_Year)
            .input('WM_Month', sql.Int, newWeek.WM_Month)
            .input('CalStartDate', sql.DateTime, newWeek.CalStartDate)
            .query('INSERT INTO WMWeek (WMWeekCode, WM_WeekNum, WM_Year, WM_Month, CalStartDate) VALUES (@WMWeekCode, @WM_WeekNum, @WM_Year, @WM_Month, @CalStartDate)');
        return insertWeek.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}


async function buildNeededWeeks(numberOfWeeks){
    let weeksToBuild = 52 - numberOfWeeks;
    let lastCalWeek = await getLastFutureWeek();
    let nextWeek = lastCalWeek;

    for (i = 1; i <= weeksToBuild; i++) {
        nextWeek = createNextWeek(nextWeek);
        nextWeek.CalStartDate = await updateCalStartDate();
        await addWeek(nextWeek);
    }
}

module.exports = {
    getFutureWMWeeksCount : getFutureWMWeeksCount,
    getCurrentWeek : getCurrentWeek,
    getLastFutureWeek : getLastFutureWeek,
    transitionToNextWeek : transitionToNextWeek,
    createNextWeek : createNextWeek,
    buildNeededWeeks : buildNeededWeeks
}