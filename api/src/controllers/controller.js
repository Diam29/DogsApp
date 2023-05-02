const axios = require('axios');
const { Dogs, Temperaments } = require('../db.js');
const URL = `https://api.thedogapi.com/v1/breeds`;


// Traer info de la Api (devolverPerros)

const getDogsApi = async () => {
    let apiPets = (await axios.get(URL)).data
    let resultsApi = apiPets.map((dog) => {
        const heightMetric = dog.height.metric;
        const weightMetric = dog.weight.metric;
        const imageUrl = dog.image.url;
        return {
            id: dog.id,
            name: dog.name,
            image: imageUrl,
            height: heightMetric,
            weight: weightMetric,
            life_span: dog.life_span,
            temperament: dog.temperament,
            created: false
        };
    });
    return resultsApi;

}


// Traer info de la BDD (perrosDb)

const getInfoBdd = async () => {
    const dbPets = await Dogs.findAll({
        include: Temperaments
    });

    const filterPetsDb = await dbPets.map(dog => {
        const { id, name, height, weight, life_span, image, created } = dog
        return {
            id,
            name,
            height,
            weight,
            life_span,
            image,
            created
        }
    })
    return filterPetsDb
}



// Concatenar las info de Api y Bdd (dbAndApi)

const infoBdApi = async (id) => {
    const infoApi = await getDogsApi()
    const infoBd = await getInfoBdd()
    const allInfo = [...infoApi, ...infoBd]
    if (id) return await filterDogsId(allInfo, id)
    return allInfo
}

// Filtrar perros por id

const filterDogsId = async (allInfo, id) => {
    const idString = id.toString()
    const dogsFiltered = await allInfo.filter(dogId => dogId.id.toString() === idString)
    return dogsFiltered.length ? dogsFiltered : 'No se encontraron perros con ese id'
}


// Trae info de Temperaments

const infoTempBd = async () => {
    const infoTemp = await filterPetsDb.map((dog) => {
        return {
            id: dog.id,
            image: dog.img,
            name: dog.name,
            temperament: dog.temperaments.map((temper) => temper.name).join(', '),
            life_span: dog.life_span,
            weight: dog.weight,
            origin: dog.origin,
            temperamentCC: dog.temperament,
        };
    });

    return infoTemp
};

// Traer todos los temperamentos 

const getAllTemperaments = async () => {
    let dataTemps = (await axios.get(URL)).data;
    let apiTemps = dataTemps.map(dog =>
        dog.temperament?.split(",")
    );
    const arrTemps = [].concat(...apiTemps);

    const borrarDuplicados = new Set(arrTemps);
    borrarDuplicados.forEach(async (temp) => {
        if (temp) {
            await Temperaments.findOrCreate({
                where: { name: temp },
            });
        }
    });
    const allTemperamentsDB = await Temperaments.findAll();
    return allTemperamentsDB;
}

module.exports = { getDogsApi, infoBdApi, infoTempBd, getAllTemperaments }


