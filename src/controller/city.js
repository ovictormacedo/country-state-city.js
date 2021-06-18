const log = require('../util/log');
const daoCity = require('../dao/city');
const { validationResult } = require('express-validator');

exports.getCitiesByStateId = async (req, res) => {
    let result = null;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        log.error(errors)
        result = errors
        res.status(400);
    } else {
        result = await daoCity.getCitiesByStateId(req.params.stateId);
        if (!result) {
            log.info("Cities were not found for "+req.params.stateId);
            result = "Cities were not found for "+req.params.stateId;
            res.status(400);
        } else {
            log.info("Retrieving cities for "+req.params.stateId);
            res.status(200);
        }
    }

    return res.send(result);
}

exports.getCityById = async (req, res) => {
    let result = null;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        log.error(errors)
        result = errors
        res.status(400);
    } else {
        result = await daoCity.getCityById(req.params.cityId);
        if (!result) {
            log.info("City not found for "+req.params.cityId);
            result = "City not found for "+req.params.cityId;
            res.status(400);
        } else {
            log.info("Retrieving city for "+req.params.cityId);
            res.status(200);
        }
    }

    return res.send(result);
}
