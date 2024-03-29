const router = require('express').Router();
const readController = require('../controllers/read.controller');
const updateController = require('../controllers/update.controller');
const createController = require('../controllers/create.controller');

const WMWeekServices = require('../services/wm-week.service');
const ProfileServices = require('../services/profile.service');
const ForecastServices = require('../services/forecast.service');
const HistoricalServices = require('../services/historical.service');
const historicalService = require('../services/historical.service');





// ******************** READ ROUTES ********************

// Route to READ all clients
// Returns a an array of all client objects
router.route('/clients').get((req, res) => {
    readController.getClientList().then(result => {
        res.json(result);
    })
})

// Route to READ all brands for one client
// Returns an array of all brand objects for a given client.
router.route('/clients/:id').get((req, res) => {
    readController.getBrandList(req.params.id).then(result => {
        res.json(result);
    })
})

// Route to READ all products from one brand for one client
// Returns an array [array of product objects, array of profiles]
router.route('/products/:id').get((req, res) => {
    readController.getProductList(req.params.id).then(result => {
        res.json(result);
    })
})

// Route to READ all profiles available for one client
// Returns an array [array of profiles]
router.route('/profiles/:id').get((req, res) => {
    readController.getProfileList(req.params.id).then(result => {
        res.json(result);
    })
})

// Route to READ ONE profile available for one client
// Returns an array [profile, profileData]
router.route('/profiles/view/:id').get((req, res) => {
    readController.getProfile(req.params.id).then(result => {
        res.json(result);
    })
})

// Route to READ hostorical data for one item
// Returns an array of all history objects for one item
router.route('/products/historical-data/:id').get((req, res) => {
    readController.getHistoricalData(req.params.id).then(result => {
        console.log('this is it' + result);
        res.json(result);
    })
})

// Route to READ one year of forecast data for one object
// Returns an array of 52 weekly forecast objects
router.route('/products/forecast/:id').get((req, res) => {
    readController.getItemForecast(req.params.id).then(result => {
        res.json(result);
    })
})

// Route to get to the add item page
// Returns an array with info to help populate the new item (i.e. brand, category, and group)
router.route('/products/add/:id').get((req, res) => {
    readController.addItemGetter(req.params.id).then(result => {
        res.json(result);
    })
})





// ******************** CREATE ROUTES ********************

// CREATE a new client record and create the initial forecast
router.route('/clients/add/').post((req, res) => {
    let newClient = req.body.ClientName;
    createController.addClient(newClient).then(result => {
        res.status(201).json(result);
    })
})

// CREATE a new product record and create the initial forecast
router.route('/products/add/').post((req, res) => {
    let newItemObj = { ...req.body };
    createController.addItem(newItemObj).then(result => {
        res.status(201).json(result);
    })
})

// UPDATE (1) SeasonalProfile record and (2) 52 weeks of ProfileData
router.route('/profiles/update/').post((req, res) => {
    let profile = req.body.profile;
    let profileData = req.body.profileData;
    createController.UpdateProfile(profile, profileData).then(result => {
        res.json(result);
    })
})





// ******************** UPDATE ROUTES ********************

// UPDATE product-level edits
router.route('/products/update/').post((req, res) => {
    let itemObj = { ...req.body };
    updateController.updateItemInfo(itemObj).then(result => {
        res.status(201).json(result);
    })
})

// UPDATE weekly-forecast-level changes
router.route('/products/forecast/update/').post((req, res) => {
    let forecastObj = { ...req.body };
    updateController.updateItemForecast(forecastObj).then(result => {
        res.json(result);
    })
})
// UPDATE (1) SeasonalProfile record and (2) 52 weeks of ProfileData
router.route('/profiles/view/').post((req, res) => {
    let profile = req.body.profile;
    let profileData = req.body.profileData;
    updateController.updateProfile(profile, profileData).then(result => {
        res.json(result);
    })
})






// ******************** DELETE ROUTES ********************

// This functionality will not be built into this initial MVP


module.exports = router;