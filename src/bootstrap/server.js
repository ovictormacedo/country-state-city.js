require('dotenv').config();
const log = require('../util/log');
const http = require('http');
const https = require('https');

exports.webServer = (app) => {
    http.createServer({}, app).listen(process.env.PORT, function(){
        log.info("CEP API listening on port " + process.env.PORT);
    });
}