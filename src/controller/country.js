const log = require('../util/log');
const daoCountry = require('../dao/country');

exports.getCountries = async (req, res) => {
    let result = await daoCountry.getCountries();
    if (Object.keys(result).length == 0) {
        log.info("Countries were not found");
        res.status(204);
    } else {
        log.info("Retrieving countries");
        res.status(200);
    }
    res.send(result);
}
