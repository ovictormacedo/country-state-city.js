const express = require("express");

const appAux = express();
appAux.use(express.json());
appAux.use(express.urlencoded({ extended: true }));

exports.app = () => {return appAux;}