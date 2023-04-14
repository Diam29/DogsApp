const { infoBdApi } = require('../controllers/controller')
const { Dogs, Temperaments } = require('../db.js')

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


// buscar perros por id devolverPerroId


const dataDogsId = async (req, res) => {
    const { id } = req.params;

    try {
        let allDogsId = await infoBdApi(id)
        res.status(200).json(allDogsId)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createDog = async (req, res) => {
    const { name, height, weight, life_span, temperament, image } = req.body;
    if (!name || !height || !weight || !life_span || !temperament || !image) {
        res.status(500).send('Faltan datos')
    }
    try {

        const dogCreated = await Dogs.create({
            name, height, weight, life_span, image
        });

        const temperamentBd = await Temperaments.findOne({
            where: { name: temperament },
        });
        await dogCreated.addTemperaments(temperamentBd); // se agrega el await para esperar que se encuentren los temperaments
        res.status(200).send("El perro fue creado con exito");
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
};


module.exports = { createDog, dataDogsId, dataAllDogs }


