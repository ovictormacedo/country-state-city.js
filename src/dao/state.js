const { DataTypes, literal } = require('sequelize');
const log = require('../util/log');
const conf = require('./config');

const stateSchema = conf.sequelize.define('state', {
    name: {
        type: DataTypes.STRING
    },
    country_id: {
        type: DataTypes.INTEGER
    },
    country_code: {
        type: DataTypes.STRING
    },
    state_code: {
        type: DataTypes.STRING
    },
    latitude: {
        type: DataTypes.DOUBLE
    },
    longitude: {
        type: DataTypes.DOUBLE
    },
},{
    timestamps: false,
    tableName: "state",
});

exports.getStatesByCountryId = async (countryId) => {
    try {
        return await stateSchema.findAll({
            where: { country_id: countryId },
            order: literal("name", "ASC"),
        });
    } catch (error) {
        log.error(error);
        return null;
    }
}

exports.getStateById = async (id) => {
    try {
        return await stateSchema.findOne({where: { id: id }});
    } catch (error) {
        log.error(error);
        return null;
    }
}