const { param } = require('express-validator');

exports.getCitiesByStateId = [
    param("countryId").isLength({min: 1, max: 15}),
    param("stateId").isLength({min: 1, max: 15}),
]