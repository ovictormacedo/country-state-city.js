const log = require('../util/log');
const daoCountry = require('../dao/country');

exports.getCountries = async (req, res) => {
    let result = await daoCountry.getCountries();
    if (!result) {
        log.info("Countries were not found");
        result = "Countries were not found"
        res.status(400);
    } else {
        log.info("Retrieving countries");
        res.status(200);
    }
    res.send(result);
}

exports.getCountriesByRegion = async (req, res) => {
    let result = await daoCountry.getCountriesByRegion(req.params.region);
    if (!result) {
        log.info("Countries by region were not found");
        result = "Countries by region were not found"
        res.status(400);
    } else {
        log.info("Retrieving countries by region");
        res.status(200);
    }
    res.send(result);
}

exports.getCountryById = async (req, res) => {
    let result = await daoCountry.getCountryById(req.params.countryId);
    if (!result) {
        log.info("Country not found");
        result = "Country not found"
        res.status(400);
    } else {
        log.info("Retrieving country by id");
        res.status(200);
    }
    res.send(result);
}