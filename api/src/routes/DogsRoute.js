const { Router } = require('express');
// const { getDogHandler, getDogHandlerId, createDogHandler, devolverPerro, devolverPerroId, generoNewPerro, } = require('../handlers/dogHandler.js');
const { allDogsApi, allDogsDb, allDogsDBApi, getDogsById, createDog, getDogsByName, getDogsByTemperament } = require('../handlers/dogHandler.js')

const dogsRoute = Router();


dogsRoute.get('/api', allDogsApi)

dogsRoute.get('/db', allDogsDb)

dogsRoute.get('/', allDogsDBApi)

dogsRoute.get('/name', getDogsByName)

dogsRoute.get('/:id', getDogsById)

dogsRoute.get('/temp/name', getDogsByTemperament)

dogsRoute.post('/create', createDog)



module.exports = dogsRoute;