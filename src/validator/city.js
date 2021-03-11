const { param } = require('express-validator');

exports.getCitiesByStateId = [
    param("countryId").exists().isString(),
    param("stateId").exists().isString(),
]