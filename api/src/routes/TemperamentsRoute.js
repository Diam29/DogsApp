const { Router } = require('express');
const { getTemperaments, getTemperamentsByName } = require('../handlers/TemperamentHanlder');

const temperamentsRoute = Router();

temperamentsRoute.get('/', getTemperaments)

temperamentsRoute.get('/name', getTemperamentsByName)



module.exports = temperamentsRoute 