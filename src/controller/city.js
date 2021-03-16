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
