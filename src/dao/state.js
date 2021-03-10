const { DataTypes } = require('sequelize');
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
        let states = await stateSchema.findAll({
            where: { country_id: countryId },
        });
        return states;
    } catch (error) {
        log.error(error);
        return false
    }
}
