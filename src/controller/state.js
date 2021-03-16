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
        if (!result) {
            log.info("States were not found for "+req.params.countryId);
            result = "States were not found for "+req.params.countryId
            res.status(400);
        } else {
            log.info("Retrieving states for "+req.params.countryId);
            res.status(200);
        }
    }
    res.send(result);
}
