const express = require("express");
const cors = require('cors')

const appAux = express();
appAux.use(express.json());
appAux.use(express.urlencoded({ extended: true }));
appAux.use(cors());

exports.app = () => {return appAux;}