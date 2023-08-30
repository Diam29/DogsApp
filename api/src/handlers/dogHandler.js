const { getDogsApi, getDogsDb, getAllDogs, getDogByName, getDogById, dogCreated, getAllTemperaments, getDogByTemperament } = require('../controllers/allControllerDogsTemp.js')
const { Dogs, Temperaments } = require('../db.js')

// Buscar perros en la api

const allDogsApi = async (req, res) => {
    try {
        const dogsApi = await getDogsApi()
        res.status(200).json(dogsApi)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Buscar perros en la DB 

const allDogsDb = async (req, res) => {
    try {
        const dogsDb = await getDogsDb()
        res.status(200).json(dogsDb)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Busqueda de perros por nombre (query)
// const dataAllDogs = async (req, res) => {
//     const { name } = req.query;
//     try {
//         var totalDogs = await infoBdApi()

//         if (name) {
//             let dogsName = await totalDogs.filter(dog =>
//                 dog.name.toLowerCase().includes(name.toLowerCase()))
//             dogsName.length
//                 ? res.status(200).json(dogsName)
//                 : res.status(400).send(`No existen perros de raza ${name}`)
//         } else {
//             res.status(200).json(totalDogs)
//         }

//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// Buscar todos los perros en DB y API

const allDogsDBApi = async (req, res) => {
    try {
        const allDogs = await getAllDogs()
        res.status(200).json(allDogs)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Buscar perros por nombre

const getDogsByName = async (req, res) => {
    const { name } = req.query
    try {
        const dogName = await getDogByName(name)
        res.status(200).json(dogName)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Buscar perros por Id


const getDogsById = async (req, res) => {
    const { id } = req.params;
    console.log('id', typeof id);
    try {
        const dogId = await getDogById(id)
        res.status(200).json(dogId)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Crear nuevo perro
const createDog = async (req, res) => {
    const { name, height, weight, life_span, temperament, image, created } = req.body;
    try {

        const newDog = await dogCreated(name, height, weight, life_span, temperament, image, created)
        res.status(200).json(newDog);
        console.log('newdog del handler', newDog);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

// Busqueda de Perros por Temperamento

const getDogsByTemperament = async (req, res) => {
    const { name } = req.query
    // console.log('entre al handler temperament name', name);
    try {
        const dogTempName = await getDogByTemperament(name)
        res.status(200).json(dogTempName)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



module.exports = { allDogsApi, allDogsDb, allDogsDBApi, getDogsById, createDog, getDogsByName, getDogsByTemperament }