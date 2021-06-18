const { DataTypes } = require('sequelize');
const log = require('../util/log');
const conf = require('./config');

const citySchema = conf.sequelize.define('city', {
    name: {
        type: DataTypes.STRING
    },
    state_id: {
        type: DataTypes.INTEGER
    },
    state_code: {
        type: DataTypes.STRING
    },
    country_id: {
        type: DataTypes.INTEGER
    },
    country_code: {
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
    tableName: "city",
});

exports.getCitiesByStateId = async (stateId) => {
    try {
        let cities = await citySchema.findAll({
            where: { state_id: stateId },
        });
        return cities;
    } catch (error) {
        log.error(error);
        return null;
    }
}

exports.getCityById = async (id) => {
    try {
        return await citySchema.findOne({where: { id: id }});
    } catch (error) {
        log.error(error);
        return null;
    }
}