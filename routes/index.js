const router = require('express').Router();
const navController = require('../controllers/nav.controller');
const forecastController = require('../controllers/forecast.controller');
const updateController = require('../controllers/update.controller');

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
router.route('/products/:id').get((req, res) => {
    navController.getProductList(req.params.id).then(result => {
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


module.exports = router;