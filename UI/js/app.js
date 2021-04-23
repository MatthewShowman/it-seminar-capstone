// import {getItemHistory} from './config.js';

//Getting the save button 
const SAVEITEM = document.getElementById('save-btn-item');

//Gettin the new item button 
const NEWITEMBTN = document.getElementById('new-item-btn');
//Gettin the close new item button 
const CLOSEMODAL = document.getElementById('close-modal');
//Getting the forecast buttons 
const FORECASTBTN = document.querySelectorAll('.field.forecast');
// getting the add new item btn 
const ADDNEWITEMBTN = document.getElementById('add-new-item-btn');
//Event listeners for the buttons
NEWITEMBTN.addEventListener('click', showAddNewItemModal);
CLOSEMODAL.addEventListener('click',closeAddNewItemModal);
ADDNEWITEMBTN.addEventListener('click', addNewItemToDataBase);
// getting the modal element 
const MODAL = document.getElementById('modal-overlay');
//function to show the modal
async function showAddNewItemModal () {
    MODAL.classList.remove('hidden');
};

//function to close the modal 
async function closeAddNewItemModal () {
    MODAL.classList.add('hidden');
};
// function to add new item to db 
async function addNewItemToDataBase () {
    closeAddNewItemModal();
    //add functionality here to fetch post 
}



//--------------------------------------------------------------------------------------------
//------------------------------ Item Management Tab -----------------------------------------
//--------------------------------------------------------------------------------------------

// options for fetching the data 
const options = {
    method: 'GET',
};


// .then ((data) => {
//     console.log(data.ItemID);
// });


var idElement =[{
    "ItemID":1,
    "ItemName": "Item 1",
    "BrandID":1,
    "BrandName": "Squeaky Clean",
    "ClientID": 1,
    "ClientName": "Proctor and Gamble",
    "CatID": 1,
    "CatName": "Cleaner",
    "GroupID": 1,
    "GroupName": "Spray",
    "Current Profile": 1,
    "Profile Name": "No Seasonality",
    "Default Price": 3.13,
    "Current Stores": 4578,
    "IsCurrentProd": "Y"
},
{
    "ItemID":2,
    "ItemName": "Item 2",
    "BrandID":1,
    "BrandName": "Squeaky Clean",
    "ClientID": 1,
    "ClientName": "Proctor and Gamble",
    "CatID": 1,
    "CatName": "Cleaner",
    "GroupID": 1,
    "GroupName": "Spray",
    "Current Profile": 1,
    "Profile Name": "No Seasonality",
    "Default Price": 3.13,
    "Current Stores": 4575,
    "IsCurrentProd": "Y"
},
{
    "ItemID":3,
    "ItemName": "Item 3",
    "BrandID":1,
    "BrandName": "Squeaky Clean",
    "ClientID": 1,
    "ClientName": "Proctor and Gamble",
    "CatID": 1,
    "CatName": "Cleaner",
    "GroupID": 1,
    "GroupName": "Spray",
    "Current Profile": 1,
    "Profile Name": "No Seasonality",
    "Default Price": 3.13,
    "Current Stores": 4578,
    "IsCurrentProd": "Y"
},
{
    "ItemID":4,
    "ItemName": "Item 4",
    "BrandID":1,
    "BrandName": "Squeaky Clean",
    "ClientID": 1,
    "ClientName": "Proctor and Gamble",
    "CatID": 1,
    "CatName": "Cleaner",
    "GroupID": 1,
    "GroupName": "Spray",
    "Current Profile": 1,
    "Profile Name": "No Seasonality",
    "Default Price": 3.13,
    "Current Stores": 4575,
    "IsCurrentProd": "Y"
}];

//This is just a dummy object for the seasonal profile list
var seasonalProfileObject = [
    {
        "SeasonalProfileID": 0,
        "SeasonalProfileName":"No Seasonality",
        "SeasonalFactor": 1

    },
    {
        "SeasonalProfileID": 0,
        "SeasonalProfileName":"Christmas",
        "SeasonalFactor": 1

    }
];
// empty array to contain all rows 
var row = [];


// // forecast object length
// var forecastLegth = forecastObject.length;
// // id element length 
var _length = idElement.length;

// this function creates all the necessary HTML elements for each object in the array and adds data t othe fields
async function createItemRowAndAddData (el, id) {
    // constructor to build a retrun object to run query 
    function rowElement (_itemID) {
        this.ItemID = _itemID
    };
    // some variable definitions
    var _indexOf = el;
    var _idOf = id;

    //creating some default values 
    var _defaultVelocity = 1;
    var _defaultCost = 1;
    //getting the parent
    var parent = document.getElementById('contain-list');

    //creating name and adding data to this field
    var _nameContent = idElement[_indexOf].ItemName;
    var _nameField = document.createElement('div');
    var _nameInnerText = _nameField.innerText = _nameContent;
    _nameField.className = 'field';
    _nameField.id = `name-field${_indexOf}`;
    _nameInnerText.className = 'text-block-6';
    parent.appendChild(_nameField);
    
    // creating POS Store and adding data to this field
    var _POSContent = idElement[_indexOf]["Current Stores"];
    var _POSStoresField = document.createElement('div');
    var _POSStoresInnerText = _POSStoresField.innerText = _POSContent;
    _POSStoresField.className = 'field';
    _POSStoresField.id = `pos-field${_indexOf}`;
    _POSStoresInnerText.className = 'text-block-6';
    parent.appendChild(_POSStoresField);
    

    // creating the velocity and adding data to this field
    var _velocityContent = idElement [_indexOf].velocity;
    var _velocityField = document.createElement('div');
    var _velocityInnerText = _velocityField.innerText = _defaultVelocity;
    _velocityField.className = 'field';
    _velocityField.id = `velocity-field${_indexOf}`;
    _velocityInnerText.className = 'text-block-6';
    parent.appendChild(_velocityField);

    // creating the profile and adding data to this field
    var _profileContent = idElement [_indexOf]["Profile Name"];
    var _profileField = document.createElement('select');
    var _profileInnerText = _profileField.innerText = _profileContent;
    _profileField.className = 'field';
    _profileField.id = `profile-factor${_indexOf}`;
    _profileField.setAttribute('onClick','appendSeasonalProfiles(this.id)');
    _profileInnerText.className = 'text-block-6';
    parent.appendChild(_profileField);


    //Creating the cost and adding data to this field
    var _costContent = idElement[_indexOf].cost;
    var _costField = document.createElement('div');
    var _costInnerText = _costField.innerText = _defaultCost;
    _costField.className = 'field';
    _costField.id = `item-cost${_indexOf}`;
    _costInnerText.className = 'text-block-6';
    parent.appendChild(_costField);

    // creating the forecast and adding data to this field -- THE DEFAULT VALUE IS FORECAST
    var _forecastField = document.createElement('div');
    _forecastField.innerText = 'FORECAST';
    _forecastField.className = 'field forecast';
    _forecastField.id = _idOf;
    _forecastField.setAttribute ('onClick', 'getCurrentRow(this.id)'); 
    parent.appendChild(_forecastField);
    var _itemIDFromArray = idElement[_indexOf].ItemID;
    var newRow = new rowElement(_itemIDFromArray);
    row.push(newRow);
};
// creating an array to store the values read from the object 
var seasonalProfileArray = [];
// function to append all seasonal profiles to list 
async function appendSeasonalProfiles (fieldID) {
// setting the array to 0 to avoid repeated items 
seasonalProfileArray.length=0;
// setting the list to 0 to avoid repeated options
document.getElementById(fieldID).options.length=0;
    // appending the values from the object to the empty array 
    for (var l = 0; l < seasonalProfileObject.length; l++) {
        let profile = seasonalProfileObject[l].SeasonalProfileName;
        seasonalProfileArray.push(profile);
    };
    // appending all the values from the array to the select element 
    // -- this is just a variable to read the current list parent 
    var currentProfileListField = document.getElementById(fieldID);
    // iterating through the list and apending the option to the select element 
    for (var val of seasonalProfileArray) {
        var option = document.createElement('option');
        option.value = val;
        option.text = val.charAt(0) + val.slice(1);
        currentProfileListField.appendChild(option);
    }
    //console.log('these are the current profiles: ' + seasonalProfileArray);
    

}
// function to get the current row object, ITEM ID and Client ID 
async function getCurrentRow (_clickedId) {
    var currentRowArray =[];
    var _itemIdFromRow = row[_clickedId].ItemID;
    // object constructor
    function currentRow (_itemIdIn) {
        this.ItemID = _itemIdIn
    };
    // creating a new object 
    var currentRowObject = new currentRow (_itemIdFromRow);
    alert ("Forecast succesful. Please proceed to the forecast tab to revise.");
    console.log(currentRowObject);
    //-------------------------- !!!! ------------------------------------
    // theres a funtion that needs to run everytime the forecast is hit!!!

    
    //-------------------------- !!!! ------------------------------------
    return currentRowObject; // ---> this is what Matt needs to return the forecast 
};

// on load do all this 
window.onload = function () {
    hideProfileFields();
    fetchHistoricalData(2);
    let indexOf = 0;
    let idOf = 0;
    let forecastInd = 0;
    // this iterates through the items list and runs the Create item and add data function
    for (var i = 0; i < _length; i++) {
        createItemRowAndAddData(indexOf, idOf);
        indexOf++;
        idOf++;
    };

};
// the empty array declared as global 
var saveItemDataArray = [];
// a function saving all data as an array of objects to pass to db when the save button is pressed 
async function saveAllItemData () {
    saveItemDataArray.length =0;
    // a for loop to iterate through HTML elements --> less than 5 *****CHANGE *****
    // -- this will need to be updated/ changed for leap-years
    for (var saveItemIndex = 0; saveItemIndex < 4; saveItemIndex ++) {
        var saveItemName = document.getElementById(`name-field${saveItemIndex}`).textContent;
        var saveItemPosStores = document.getElementById(`pos-field${saveItemIndex}`).textContent;
        var saveItemVelocity = document.getElementById(`velocity-field${saveItemIndex}`).textContent;
        var saveItemSeasonalProfile = document.getElementById(`profile-factor${saveItemIndex}`).value;
        var saveItemBaseCost = document.getElementById(`item-cost${saveItemIndex}`);
        var saveItemId = idElement[saveItemIndex].ItemID;
        var saveBrandId = idElement[saveItemIndex].BrandID;
        var saveGroupId = idElement[saveItemIndex].GroupID;
        var saveCatId = idElement[saveItemIndex].CatID;
        var savePrice = idElement[saveItemIndex]["Default Price"];

        function saveItemRow (itemIDIn,itemNameIn, brandIDIn, catIDIn, groupIDIn,defaultPriceIn, currentProfileIn) {
            this.ItemID = itemIDIn,
            this.ItemName = itemNameIn,
            this.BrandID = brandIDIn,
            this.CatID = catIDIn,
            this.GroupID = groupIDIn,
            this.DefaultPrice = defaultPriceIn,
            this.CurrentProfile = currentProfileIn
        };
        // this is a constructor for the object for each row 
        
        // creating a new object 
        var saveNewItem = new saveItemRow (saveItemId,saveItemName,saveBrandId,saveCatId,saveGroupId,savePrice,saveItemSeasonalProfile);
        saveItemDataArray.push(saveNewItem);
    };
    alert('Changes saved! Safe to move forward now..');
    console.log(saveItemDataArray);
    //-------------------------- !!!! ------------------------------------
    // theres a funtion that needs to run everytime the SAVE is hit!!!
    //-------------------------- !!!! ------------------------------------
    return (saveItemDataArray);

};
//--------------------------------------------------------------------------------------------
//------------------------------ Forecast Tab -------------------------------------------------
//--------------------------------------------------------------------------------------------
// async function to fetch the historical data :: parameter is the ID of the item 
async function fetchHistoricalData (idIn){
    // wait for the fletch to complete 
    await fetch (`/products/forecast/${idIn}`,options)
    .then (result => result.json())
    .then (function(data){
        forecastObject = data["itemForecast"]
        // this function will create each HTML element for each data field
        function createForecastTableandAddData(dataIndexIn) {
            var _forecastIndex = dataIndexIn; 
            // creating some default values 
            var _defaultAdjustment = 0;
            var _defaultFactor = 1;
        
            //getting the parent for the grid 
            var _forecastParent = document.getElementById('forecast-grid');
            // creating the WMWeeks and adding data to it 
            var _forecastWMWeeksField = document.createElement('div');
            _forecastWMWeeksField.className = 'field';
            _forecastWMWeeksField.id = `w-weeks${_forecastIndex}`;
            _forecastWMWeeksField.innerText = forecastObject[_forecastIndex].WMWeekCode;
            _forecastParent.appendChild(_forecastWMWeeksField);
        
            // creating the POSStores field and adding data to it
            var _forecastPOSStoresField = document.createElement('div');
            _forecastPOSStoresField.className = 'field';
            _forecastPOSStoresField.id = `pos-store${_forecastIndex}`;
            _forecastPOSStoresField.innerText = forecastObject[_forecastIndex].ForecastStores;
            console.log('stores: '+_forecastPOSStoresField.textContent);
            _forecastParent.appendChild(_forecastPOSStoresField);
        
            // creating the Velocity field and adding data to it
        
            var _forecastVelocityField = document.createElement('div');
            _forecastVelocityField.className = 'field';
            _forecastVelocityField.id = `velocity${_forecastIndex}`;
            _forecastVelocityField.innerText = forecastObject[_forecastIndex].Velocity;
            _forecastParent.appendChild(_forecastVelocityField);
        
            // creating the Seasonality Factor field and adding data to it
            var _forecastSeasonalFactorField = document.createElement('div');
            _forecastSeasonalFactorField.className = 'field';
            _forecastSeasonalFactorField.id = `seasonal-profile${_forecastIndex}`;
            _forecastSeasonalFactorField.innerText = forecastObject[_forecastIndex].SeasonFactor;
            _forecastParent.appendChild(_forecastSeasonalFactorField);
        
            // creating the cost field and adding data to it
            var _forecastCostField = document.createElement('INPUT');
            _forecastCostField.setAttribute('type','number');
            _forecastCostField.className = 'field allowChange';
            _forecastCostField.id = `cost-field${_forecastIndex}`;
            _forecastCostField.setAttribute ('onChange', `reCalcForecastTotalUnitsAndCost(${_forecastIndex})`);
            _forecastCostField.defaultValue = 1;
            _forecastParent.appendChild(_forecastCostField);
        
            // creating the Manual Adjustment field and adding data to it
            var _forecastManAdjField = document.createElement('INPUT');
            _forecastManAdjField.setAttribute('type','number');
            _forecastManAdjField.className = 'field allowChange';
            _forecastManAdjField.id = `man-adjust${_forecastIndex}`;
            _forecastManAdjField.setAttribute ('onChange', `reCalcForecastTotalUnitsAndCost(${_forecastIndex})`);
            _forecastManAdjField.defaultValue = _defaultAdjustment;
            _forecastParent.appendChild(_forecastManAdjField);
        
            // creating the Factor field and adding data to it
            var _forecastFactorField = document.createElement('INPUT');
            _forecastFactorField.setAttribute('type','number');
            _forecastFactorField.className = 'field allowChange';
            _forecastFactorField.id = `factor-field${_forecastIndex}`;
            _forecastFactorField.setAttribute ('onChange', `reCalcForecastTotalUnitsAndCost(${_forecastIndex})`);
            _forecastFactorField.defaultValue = _defaultFactor;
            _forecastParent.appendChild(_forecastFactorField);
        
            // creating the price field 
            var _forecastPriceField = document.createElement('INPUT');
            _forecastPriceField.setAttribute('type','number');
            _forecastPriceField.className = 'field allowChange';
            _forecastPriceField.id = `price-field${_forecastIndex}`;
            _forecastPriceField.defaultValue = forecastObject[_forecastIndex].ForecastPrice;
            _forecastParent.appendChild(_forecastPriceField);
        
            
            // creating the Total Units field and adding data to it -- missing formula to calculate 
            // for now the formula only adds the velocity, the factor and multiplies by cost 
            var _forecastTotalUnitsField = document.createElement('div');
            _forecastTotalUnitsField.className = 'field';
            _forecastTotalUnitsField.id = `total-units${_forecastIndex}`;
            _forecastTotalUnitsField.setAttribute('data-index',_forecastIndex);
            _forecastTotalUnitsField.innerText = ' ';
            _forecastParent.appendChild(_forecastTotalUnitsField);
            
            
            // creating the Total Costand adding data to it -- missing formula to calculate 
            var _forecastTotalCostField = document.createElement('div');
            _forecastTotalCostField.className = 'field';
            _forecastTotalCostField.id = `total-cost${_forecastIndex}`;
            _forecastTotalCostField.innerText = ' ';
            _forecastParent.appendChild(_forecastTotalCostField);
            
        
            forecastTotalUnitsAndTotalCost(_forecastIndex,_forecastVelocityField.textContent,_forecastPOSStoresField.textContent,_forecastSeasonalFactorField.textContent,_forecastFactorField.value,_forecastManAdjField.value,_forecastCostField.value);
        };
        console.log(forecastObject[1].ItemID);
    for (var w= 0; w < forecastObject.length; w++) {
        createForecastTableandAddData(w);
    };
    
    });
    };
    
    
    

// function to create the foecast fields 


//this function will calculate total units the first time the page loads 
function forecastTotalUnitsAndTotalCost (index,velocity,stores,seasonalFactor,factor, manuaAdjust, cost) {
    // declaring variables 
    var forecastTotalUnitsField = document.getElementById(`total-units${index}`);
    var forecastTotalCostField = document.getElementById(`total-cost${index}`);
    var forecastVelocity = parseInt(velocity,10);
    var forecastStores = parseInt(stores,10);
    var forecastSeasonal = parseFloat(seasonalFactor);
    var forecastFactor = parseFloat(factor);
    var forecastManualAdj = parseFloat(manuaAdjust);
    var forecastCost = parseFloat(cost);

    //formula 
    var totalCostFormula =  ((forecastVelocity*forecastStores*forecastSeasonal*forecastFactor)+forecastManualAdj)*forecastCost;
    var totalUnitsFormula = ((forecastVelocity*forecastStores*forecastSeasonal*forecastFactor)+forecastManualAdj);
    //converting to floats
    var totalCostFormulaFl = parseFloat(totalCostFormula);
    var totalUnitsFormulaFl = parseFloat(totalUnitsFormula);
    //var totalCostFormula =  ((forecastVelocity*forecastStores*forecastSeasonal*forecastFactor)+forecastManualAdj)*forecastCost;
    forecastTotalCostField.innerText = totalCostFormulaFl;
    forecastTotalUnitsField.innerText = totalUnitsFormulaFl;


};

//this function will calculate total units every time there is a change to the inputs, for that specific row 
async function reCalcForecastTotalUnitsAndCost (indexIn) {
    // getting the elemenets at a particular index position 
    var walmartWeek = document.getElementById(`w-weeks${indexIn}`).textContent;
    var pointOfSaleStores = document.getElementById(`pos-store${indexIn}`).textContent;
    var velocity = document.getElementById(`velocity${indexIn}`).textContent;
    var seasonalityFactor = document.getElementById(`seasonal-profile${indexIn}`).textContent;
    var cost = document.getElementById(`cost-field${indexIn}`).value;
    var manualAdjustment = document.getElementById(`man-adjust${indexIn}`).value;
    var factor = document.getElementById(`factor-field${indexIn}`).value;
    var totalCost = document.getElementById(`total-cost${indexIn}`);
    var totalUnits = document.getElementById(`total-units${indexIn}`);
    // converting to integers 
    var velocityInt = parseInt(velocity,10);
    var pointOfSaleInt = parseInt (pointOfSaleStores,10);
    var seasonalityInt = parseInt (seasonalityFactor,10);
    var factorInt = parseFloat (factor);
    var manAdjInt = parseFloat (manualAdjustment);
    var costInt = parseFloat (cost);
    

    //running the formula again 
    var totalCostFormulaRt = ((velocityInt*pointOfSaleInt*seasonalityInt*factorInt)+manAdjInt)*costInt;
    var totalUnitsFormulaRt = ((velocityInt*pointOfSaleInt*seasonalityInt*factorInt)+manAdjInt);
    // converting to floats
    var totalCostFormulaRtFl = parseFloat(totalCostFormulaRt,10);
    var totalUnitsFormulaRtFl = parseFloat(totalUnitsFormulaRt,10);
    
    //updating the value 
    totalCost.innerText = totalCostFormulaRtFl;
    totalUnits.innerText = totalUnitsFormulaRtFl;
    

};
// the save button 
// -- this button needs to create an array of objects, similar to what Matt gave us, to update the db 
// the empty array declaration as global 
var saveForecastArray = [];
// an event listener to listen to the click event on the save button 


// this function will save all data to an array of objects 
async function saveForecast () {
    saveForecastArray.length =0;
    // a for loop to iterate through HTML elements --> less than 5 *****CHANGE *****
    // -- this will need to be updated/ changed for leap-years
    for (var saveIndex = 0; saveIndex < 5; saveIndex ++) {
        
        var walmartWeek = document.getElementById(`w-weeks${saveIndex}`).textContent;
        var pointOfSaleStores = document.getElementById(`pos-store${saveIndex}`).textContent;
        var velocity = document.getElementById(`velocity${saveIndex}`).textContent;
        var seasonalityFactor = document.getElementById(`seasonal-profile${saveIndex}`).textContent;
        var cost = document.getElementById(`cost-field${saveIndex}`).value;
        var manualAdjustment = document.getElementById(`man-adjust${saveIndex}`).value;
        var factor = document.getElementById(`factor-field${saveIndex}`).value;
        var totalUnits = document.getElementById(`total-units${saveIndex}`);
        var itemIdSave =  forecastObject[saveIndex].ItemID;
        var forecastPriceSave = document.getElementById(`price-field${saveIndex}`).value;
        // this is a constructor for the object for each row 
        function saveRow (itemIDIn,walmartWeekIn, priceIn, pointOfSaleStoresIn, manuaAdjustIn,factorIn, seasonalFactorIn, costIn) {
            this.ItemID = itemIDIn,
            this.WMWeekCode = walmartWeekIn,
            this.ForecastPrice = priceIn,
            this.ForecasStores = pointOfSaleStoresIn,
            this.ItemAdjust = manuaAdjustIn,
            this.FactorAdjust = factorIn,
            this.LeadTime = null,
            this.SeasonFactor = seasonalFactorIn,
            this.ForecastCost = costIn
        };
        // creating a new object 
        var saveNewRow = new saveRow (itemIdSave,walmartWeek,forecastPriceSave,pointOfSaleStores,manualAdjustment,factor,seasonalityFactor,cost);
        saveForecastArray.push(saveNewRow);
    };
    alert('Changes saved! Safe to move forward now..');
    console.log(saveForecastArray);
    //-------------------------- !!!! ------------------------------------
    // theres a funtion that needs to run everytime the SAVE is hit!!!
    //-------------------------- !!!! ------------------------------------
    return (saveForecastArray);
}


//the plot button 
// -- this is for IAN 
async function plotGraph () {
// empty arrays for the data coming in 
var labelsArray = [];
var dataArray = [];
// setting arrays back to 0 length to avoid 
labelsArray.length = 0;
dataArray.length = 0;

for (var y = 0; y < 52; y++) {
    let totalUnits = document.getElementById(`total-units${y}`).textContent;
    let walmarweek = document.getElementById(`w-weeks${y}`).textContent;
    dataArray.push(totalUnits);
    labelsArray.push(walmarweek);  
};



let myChart = document.getElementById('myChart').getContext('2d');

//Global Options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';

let massPopChart = new Chart(myChart, {
  type:'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data:{
    labels:labelsArray,
    datasets:[{
      label:'Forecasted Units',
      data:dataArray,
      //backgroundColor:'green',
      backgroundColor:[
        'rgba(20, 99, 132, 0.6)'
      ],
      borderWidth:1,
      borderColor:'#777',
      hoverBorderWidth:3,
      hoverBorderColor:'#000'
    }]
  },
  options:{
    title:{
      display:true,
      text:'Harvest Group Forecasting',
      fontSize:25
    },
    legend:{
      display:true,
      position:'right',
      labels:{
        fontColor:'#000'
      }
    },
    layout:{
      padding:{
        left:50,
        right:0,
        bottom:0,
        top:0
      }
    },
    tooltips:{
      enabled:true
    }
  }
});
}

//--------CHART .JS

 
//--------------------------------------------------------------------------------------------
//------------------------------ Profiles Tab -------------------------------------------------
//--------------------------------------------------------------------------------------------

//Gettint the fields div 
const PROFILEFIELDS = document.getElementById ('fields-new-profile');
//Getting the New Profile Btn 
const NEWPROFILE = document.getElementById('new-profile');
//Gettin the save profile button 
const SAVEPROFILE = document.getElementById('save-btn-profile');
//Event listeners 
NEWPROFILE.addEventListener('click', showProfileFields)


//creating the WMWeeks array for the profile 
var WMWeek = [];


// ------ Temporary array of weeks ------------
// iterating through 53 weeks
for (var l = 0; l < 53; l++) {
    var weekNameTable = l;
    WMWeek.push(weekNameTable);
}
// array length 
var WMlength = WMWeek.length;
// calling the function passing the array length 
pushDataToProfile (WMlength);
// ------ Temporary array of weeks ------------

//hiding the fields below the new profile btn 
async function hideProfileFields () {
    PROFILEFIELDS.classList.add('hide');
    SAVEPROFILE.classList.add('hide');
    
};
async function showProfileFields () {
    PROFILEFIELDS.classList.remove('hide');
    NEWPROFILE.classList.add('hide');
    SAVEPROFILE.classList.remove('hide');
    
}
// function to iteratively create div elements and push the data to each element
async function pushDataToProfile (_inLength){
    length = _inLength;
    console.log(_inLength);
    let indexProfile =0;
    for (var t = 0; t < length; t++){
        createProfileRowAndAddData(indexProfile);
        indexProfile++;
    }
};

// function to create each div element for factor and week
async function createProfileRowAndAddData (_in) {
    _indexOfWeek = _in;
    //getting the parent
    var profileParent = document.getElementById('profile-grid');
    // Creating a div element for both the week and the Factor 
    var weekContent = WMWeek[_indexOfWeek];
    var weekDiv = document.createElement('div');
    weekDiv.classList.add('field', 'week');
    weekDiv.id = `week-profile${_in}`;
    weekDiv.innerText = weekContent;
    profileParent.appendChild(weekDiv);
    // -- Factor    
    var factorDiv = document.createElement ('INPUT');
    factorDiv.className = 'field';
    factorDiv.setAttribute('type','number');
    factorDiv.defaultValue = '1';
    factorDiv.id = `factor-profile${_in}`;
    profileParent.appendChild(factorDiv);
}; 
 
console.log(row);

// a function to save all items to an array of objects 
// the empty array to store the objects 
var profileObjectsArray = [];
async function saveAllProfileData () {

// the object constructor for the profile data 
function profileData (weekNumberIn, SeasonalityFactorIn) {
    this.WeekNum = weekNumberIn,
    this.SeasonFactor = SeasonalityFactorIn
};
// constructor for a single object containing the profile name and client ID
function profileObject (clientIDIn, profileNameIn) {
    this.ClientID = clientIDIn,
    this.ProfileName = profileNameIn
};

// iterating and appending values to array 
for (var y = 0; y < WMlength; y ++) {
    var profileWeekNumber = document.getElementById(`week-profile${y}`).textContent;
    var profileSeasonalFactor = document.getElementById(`factor-profile${y}`).textContent;
    var profileDataNew = new profileData (profileWeekNumber,profileSeasonalFactor);
    profileObjectsArray.push (profileDataNew);
};

// creating the profile object 
var profileClientID = idElement[0].ClientID;
var profileName = document.getElementById('profile-name-in').value;
var profileObjectNew = new profileObject (profileClientID,profileName);
alert ('Changes saved! Safe to move forward now..');
console.log(profileObjectNew, profileObjectsArray);
return [profileObjectNew, profileObjectsArray];

}




