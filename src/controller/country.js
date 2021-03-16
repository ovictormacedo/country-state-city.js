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
