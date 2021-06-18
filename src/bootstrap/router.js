const countryController = require("../controller/country");
const stateController = require("../controller/state");
const cityController = require("../controller/city");

const stateValidator = require("../validator/state");
const cityValidator = require("../validator/city");

BASE_ROUTE = "/api/cep"

exports.router = app => {
    app.get(`${BASE_ROUTE}/country/:countryId`, countryController.getCountryById);
    app.get(`${BASE_ROUTE}/state/:stateId`, stateController.getStateById);
    app.get(`${BASE_ROUTE}/city/:cityId`, cityController.getCityById);

    app.get(`${BASE_ROUTE}/country/region/:region`, countryController.getCountriesByRegion);
    app.get(`${BASE_ROUTE}/country`, countryController.getCountries);
    app.get(
        `${BASE_ROUTE}/country/:countryId/state`,
        stateValidator.getStatesByCountryId,
        stateController.getStatesByCountryId
    );
    app.get(
        `${BASE_ROUTE}/country/:countryId/state/:stateId/city`,
        cityValidator.getCitiesByStateId,
        cityController.getCitiesByStateId,
    );
}