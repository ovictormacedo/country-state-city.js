require('dotenv').config();
const fs = require('fs');
const log = require('../util/log');
const http = require('http');
const https = require('https');

exports.webServer = (app) => {
    //Checks if the environment is set to production mode
    if (process.env.ENVIRONMENT == 'production') {
        var options = {
            key: fs.readFileSync(process.env.SSL_KEY),
            cert: fs.readFileSync(process.env.SSL_CERT),
            ca: [fs.readFileSync(process.env.SSL_CA)]
        };
        
        https.createServer(options, app).listen(process.env.PORT, function(){
            log.info("CEP API listening on port " + process.env.PORT);
        });
    } else {
        //The environment is set to development mode
        http.createServer({}, app).listen(process.env.PORT, function(){
            log.info("CEP API listening on port " + process.env.PORT);
        });
    }
}