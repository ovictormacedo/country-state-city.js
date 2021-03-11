const countryController = require("../controller/country");
const stateController = require("../controller/state");
const cityController = require("../controller/city");

const stateValidator = require("../validator/state");
const cityValidator = require("../validator/city");

exports.router = app => {
    app.get('/country', countryController.getCountries);
    app.get(
        '/country/:countryId/state',
        stateValidator.getStatesByCountryId,
        stateController.getStatesByCountryId
    );
    app.get(
        '/country/:countryId/state/:stateId/city',
        cityController.getCitiesByStateId,
        cityValidator.getCitiesByStateId
    );
}