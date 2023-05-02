const { infoBdApi } = require('../controllers/controller')
const { Dogs, Temperaments } = require('../db.js')


// Busqueda de perros por nombre (query)
const dataAllDogs = async (req, res) => {
    const { name } = req.query;
    try {
        var totalDogs = await infoBdApi()

        if (name) {
            let dogsName = await totalDogs.filter(dog =>
                dog.name.toLowerCase().includes(name.toLowerCase()))
            dogsName.length
                ? res.status(200).json(dogsName)
                : res.status(400).send(`No existen perros de raza ${name}`)
        } else {
            res.status(200).json(totalDogs)
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// buscar perros por id (devolverPerroId)

const dataDogsId = async (req, res) => {
    const { id } = req.params;

    try {
        let allDogsId = await infoBdApi(id)
        res.status(200).json(allDogsId)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Crear nuevo perro
const createDog = async (req, res) => {
    const { name, height, weight, life_span, temperament, image } = req.body;
    try {

        const dogCreated = await Dogs.create({ name, height, weight, life_span, image });

        const tempeBd = await Temperaments.findOne({ where: { name: temperament } });

        await dogCreated.addTemperaments(tempeBd);

        res.status(200).json({ message: "El perro fue creado con exito" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Error al crear el perro en la base de datos" });
    }
};




module.exports = { createDog, dataDogsId, dataAllDogs }


