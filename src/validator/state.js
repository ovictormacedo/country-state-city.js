const { param } = require('express-validator');

exports.getStatesByCountryId = [
    param("countryId").isLength({min: 1, max: 15}),
]