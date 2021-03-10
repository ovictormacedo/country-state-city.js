require('dotenv').config();
const express = require("express"),
    http = require('http'),
    https = require('https'),
    cors = require('cors'),
    fs = require('fs'),
    log = require('./util/log');

const countryController = require("./controller/country");
const stateController = require("./controller/state");

const stateValidator = require("./validator/state");

var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function main () {
    log.info("CEP API - Started");

    app.get('/country', countryController.getCountries);
    app.get(
        '/country/:countryId/state',
        stateValidator.getStatesByCountryId,
        stateController.getStatesByCountryId
    );

    //Checks if the environment is set to production mode
    if (process.env.ENVIRONMENT == 'production') {
        var options = {
            key: fs.readFileSync(process.env.SSL_KEY),
            cert: fs.readFileSync(process.env.SSL_CERT),
            ca: [fs.readFileSync(process.env.SSL_CA)]
        };
        
        https.createServer(options, app).listen(process.env.PORT, function(){
            console.log("CEP API listening on port " + process.env.PORT);
        });
    } else {
        //The environment is set to development mode
        var options = {};
        http.createServer(options, app).listen(process.env.PORT, function(){
            console.log("CEP API listening on port " + process.env.PORT);
        });
    }
}

main();