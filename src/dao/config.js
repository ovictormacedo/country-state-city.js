require('dotenv').config();
const { Sequelize } = require('sequelize');

exports.sequelize = new Sequelize({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,    
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    dialect: process.env.DATABASE_DIALECT,
    logging: false
});