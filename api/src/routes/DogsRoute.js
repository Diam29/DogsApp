const { Router } = require('express');
// const { getDogHandler, getDogHandlerId, createDogHandler, devolverPerro, devolverPerroId, generoNewPerro, } = require('../handlers/dogHandler.js');
const { dataAllDogs, dataDogsId, createDog } = require('../handlers/dogHandler')

const dogsRoute = Router();


dogsRoute.get('/', dataAllDogs)

dogsRoute.get('/:id', dataDogsId)

dogsRoute.post('/', createDog)



module.exports = dogsRoute;




