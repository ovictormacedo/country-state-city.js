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

exports.getStateById = async (req, res) => {
    let result = null
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        log.error(errors)
        result = errors
        res.status(400);
    } else {
        result = await daoState.getStateById(req.params.stateId);
        if (!result) {
            log.info("State not found for "+req.params.stateId);
            result = "State not found for "+req.params.stateId
            res.status(400);
        } else {
            log.info("Retrieving state for "+req.params.stateId);
            res.status(200);
        }
    }
    res.send(result);
}
