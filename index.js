// Node Modules
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
//const cors  = require('cors');
const path = require('path'); // THIS HAS NOT BEEN INSTALLED

// Local Directory
// const dbops = require('./dbops');
const Db = require('./mssql.utils');
const routes = require('./routes');

// 
const app = express();
//const router = express.Router();

//app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('UI'));
//app.use(cors());
app.use(session({
    secret: ['garrulous gazelle'],
    resave: true,
    saveUninitialized: true,
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect to the app routes
app.use('/', routes);


app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port: ' + port));