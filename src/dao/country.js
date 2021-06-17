const { DataTypes, literal } = require('sequelize');
const log = require('../util/log');
const conf = require('./config');

const countrySchema = conf.sequelize.define('country', {
    name: {
        type: DataTypes.STRING
    },
    iso3: {
        type: DataTypes.STRING
    },
    iso2: {
        type: DataTypes.STRING
    },
    phonecode: {
        type: DataTypes.STRING
    },
    capital: {
        type: DataTypes.STRING
    },
    currency: {
        type: DataTypes.STRING
    },
    currency_symbol: {
        type: DataTypes.STRING
    },
    tld: {
        type: DataTypes.STRING
    },
    native: {
        type: DataTypes.STRING
    },
    region: {
        type: DataTypes.STRING
    },
    subregion: {
        type: DataTypes.STRING
    },
    timezones: {
        type: DataTypes.STRING
    },
    latitude: {
        type: DataTypes.DOUBLE
    },
    longitude: {
        type: DataTypes.DOUBLE
    },
    emoji: {
        type: DataTypes.STRING
    },
    emojiu: {
        type: DataTypes.STRING
    },
},{
    timestamps: false,
    tableName: "country",
});

exports.getCountries = async () => {
    try {
        let countries = await countrySchema.findAll({
            order: literal("native", "ASC"),
        });
        return countries;
    } catch (error) {
        log.error(error);
        return null;
    }
}

exports.getCountriesByRegion = async (region) => {
    try {
        let countries = await countrySchema.findAll({
            where: { region: region },
            order: literal("native", "ASC"),
        });
        return countries;
    } catch (error) {
        log.error(error);
        return null;
    }
}