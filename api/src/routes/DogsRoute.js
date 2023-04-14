const { Router } = require('express');
// const { getDogHandler, getDogHandlerId, createDogHandler, devolverPerro, devolverPerroId, generoNewPerro, } = require('../handlers/dogHandler.js');
const { dataAllDogs, dataDogsId, createDog } = require('../handlers/dogHandler')

const dogsRoute = Router();

// const validate = (req, res, next) => {
//     const { name, height, weight, life_span, temperament, image } = req.body;
//     if (!name) return res.status(400).json({ error: 'Falta name' })
//     if (!height) return res.status(400).json({ error: 'Falta height' })
//     if (!weight) return res.status(400).json({ error: 'Falta weight' })
//     if (!life_span) return res.status(400).json({ error: 'Falta life_span' })
//     if (!temperament) return res.status(400).json({ error: 'Falta temperament' })
//     if (!image) return res.status(400).json({ error: 'Falta imagen' })
//     next()
// }

dogsRoute.get('/', dataAllDogs)

dogsRoute.get('/:id', dataDogsId)

dogsRoute.post('/', createDog)



module.exports = dogsRoute;




