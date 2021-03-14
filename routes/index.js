const router = require('express').Router();
const navController = require('../controllers/nav.controller');
const forecastController = require('../controllers/forecast.controller');
const updateController = require('../controllers/update.controller');

const services = require('../services');
const WMWeeksServices = require('../services/wm-week.service');
const ProfileServices = require('../services/profile.service');

// Navigation Routes

// Route to READ all clients
router.route('/clients').get((req, res) => {
    navController.getClientList().then(result => {
        console.log(result[0]);
        res.json(result[0]);
    })
})

// Route to READ all brands for one client
router.route('/brands/:id').get((req, res) => {
    navController.getBrandList(req.params.id).then(result => {
        console.log(result[0]);
        res.json(result[0]);
    })
})

// Route to READ all products from one brand for one client
router.route('/products').get((req, res) => {
    navController.getProductList(req.query.id).then(result => {
        console.log(result[0]);
        res.json(result[0]);
    })
})


// Historical Data Route
router.route('/product-data/:id').get((req, res) => {
    forecastController.getHistoricalData(req.params.id).then(result => {
        console.log(result[0]);
        res.json(result[0]);
    })
})

// Forecast Data Route
router.route('/forecast/:id').get((req, res) => {
    forecastController.getItemForecast(req.params.id).then(result => {
        console.log(result[0]);
        res.json(result[0]);
    })
})

// Updating Ops
router.route('/update/add-item').post((req, res) => {
    newItem = {...req.body};
    updateController.addItem(newItem).then(result => {
         console.log(result);
         res.status(201).json(result);
     })
 })

router.route('/update/add-week').post((req, res) => {
    newWeek = {...req.body};
    updateController.addWeek(newWeek).then(result => {
         console.log(result);
         res.status(201).json(result);
     })
 })

 router.route('/update/add-historical').post((req, res) => {
    console.log(req.body);
    newRecord = {...req.body};
    updateController.addHistorical(newRecord).then(result => {
         console.log(result);
         res.status(201).json(result);
     })
 })


// TESTING ROUTES

router.route('/test/getHistorical').get((req, res) => {
    services.getHistoricalData(req.query.id, req.query.year).then(result => {
        console.log(result[0]);
        res.json(result[0]);
    })
})

router.route('/test/getFutureWMWeeks').get((req, res) => {
    services.getFutureWMWeeks().then(result => {
        console.log(result[0]);
        res.json(result[0]);
    })
})

router.route('/test/getFutureWMWeeksCount').get((req, res) => {
    services.getFutureWMWeeksCount().then(result => {
        console.log(result);
        res.json(result);
    })
})

router.route('/test/getLastFutureWeek').get((req, res) => {
    WMWeeksServices.getLastFutureWeek().then(result => {
        console.log(result);
        res.json(result);
    })
})

router.route('/test/buildNeededWeeks').get((req, res) => {
    WMWeeksServices.buildNeededWeeks(numberOfWeeks).then(result => {
        console.log(result);
        res.json(result);
    })
})

router.route('/test/buildWeeks').get((req, res) => {
    services.buildWeeks().then(result => {
        console.log(result);
        res.json(result);
    })
})

router.route('/test/getProfile').get((req, res) => {
    ProfileServices.getFullProfile(req.query.group).then(result => {
        console.log(result);
        res.json(result);
    })
})


module.exports = router;