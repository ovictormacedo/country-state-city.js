const log = require('../util/log');
const daoState = require('../dao/state');
const { validationResult } = require('express-validator');

exports.getStatesByCountryId = async (req, res) => {
    let result = null
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        log.error(errors)
        result = errors
        res.status(400);
    } else {
        result = await daoState.getStatesByCountryId(req.params.countryId);
        if (Object.keys(result).length == 0) {
            log.info("Countries were not found for "+req.params.countryId);
            result = "Countries were not found for "+req.params.countryId
            res.status(400);
        } else {
            log.info("Retrieving countries for "+req.params.countryId);
            res.status(200);
        }
    }
    res.send(result);
}
