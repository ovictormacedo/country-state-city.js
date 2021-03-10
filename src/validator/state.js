const { param } = require('express-validator');

exports.getStatesByCountryId = [
    param("countryId").exists().isString()
]