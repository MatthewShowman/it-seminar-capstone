const sql = require('mssql');
const config = require('../mssql.utils');

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
    nextWeek.WM_Month = nextWeek.WM_Month + 18;
    return nextWeek;
}

function createFirstWMWeekOfNewYear(oldYear) {
    let newYear = Number(oldYear) + 1
    let newWMWeekCode = newYear * 100 + 1
    return newWMWeekCode;
}

async function getHistoricalData(ItemID, WM_Year){
    let week_1 = WM_Year * 100 + 1;
    let week_53 = WM_Year * 100 + 53;
    console.log(week_1);
    console.log(week_53);

    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .input('IdParam', sql.Int, ItemID)
            .input('wk1', sql.Int, week_1)
            .input('wk53', sql.Int, week_53)
            .query('SELECT * FROM Historical WHERE ItemID = @IdParam AND WMWeekCode BETWEEN @wk1 AND @wk53');
        return item.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getFutureWMWeeks(){

    try {
        let pool = await sql.connect(config);
        let item = await pool.request()
            .query('SELECT * FROM WMWeek WHERE CalStartDate >= DATEADD(week, -1, GETDATE())');
        return item.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

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

async function buildWeeks (){
    try{
        let currentFutureWeeks = await getFutureWMWeeks();
        currentNumFutureWeeks = currentFutureWeeks[0].length;
        console.log(currentNumFutureWeeks);
        let lastFutureWeek = {};
        if (currentNumFutureWeeks <= 52) {
            lastFutureWeek = currentFutureWeeks[0][currentNumFutureWeeks-1];
        }
        else { return true}

        let nextWeek = lastFutureWeek;
        //let numWeeksToAdd = 52 - currentNumFutureWeeks;
        //for (i = 1, i <= numWeeksToAdd, i++) {
        for (i = 1; i <= 9; i++) {
            nextWeek = createNextWeek(lastFutureWeek);
            nextWeek.WM_Month = getWM_Month(nextWeek.WM_WeekNum);
        }
        return(nextWeek);
        
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    getHistoricalData : getHistoricalData,
    getFutureWMWeeks : getFutureWMWeeks,
    getFutureWMWeeksCount : getFutureWMWeeksCount,
    buildWeeks : buildWeeks
}