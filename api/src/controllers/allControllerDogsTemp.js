const axios = require('axios');
const { Op } = require('sequelize')
const URL = `https://api.thedogapi.com/v1/breeds`;
const { Dogs, Temperaments } = require('../db.js');


// Traer todos los perros de Api

const getDogsApi = async () => {
    const dogs = (await axios.get(URL)).data


    const allDogs = dogs.map((dog) => {
        const heightMetric = dog.height.metric;
        const weightMetric = dog.weight.metric;
        const imageUrl = dog.reference_image_id;
        return {
            id: dog.id,
            name: dog.name,
            image: `https://cdn2.thedogapi.com/images/${imageUrl}.jpg`,
            height: heightMetric,
            weight: weightMetric,
            life_span: dog.life_span,
            temperament: dog.temperament,
            created: dog.created
        };
    });
    return allDogs;

}

// Traer todos los perros de la Db

const getDogsDb = async () => {
    const dbDogs = await Dogs.findAll({
        include: Temperaments
    });

    const filterDogsDb = await dbDogs.map(dog => {
        const { id, name, height, weight, life_span, image, created, temperament } = dog
        return {
            id,
            name,
            height,
            weight,
            life_span,
            image,
            temperament,
            created
        }
    })
    return filterDogsDb
}


// Concatenar todos los perros de la Api y Db
const getAllDogs = async () => {
    const dogsApi = await getDogsApi()
    const dogsDb = await getDogsDb()
    const allDogs = [...dogsApi, ...dogsDb]
    return allDogs
}

// Filtrar perros por temperamento 

const getDogByTemperament = async (temperamentName) => {
    const dogsAll = await getAllDogs();
    const dogTempName = dogsAll.filter((objeto) =>
        objeto.temperament && objeto.temperament.toLowerCase().includes(temperamentName.toLowerCase())
    );
    console.log('dogtempname', dogTempName);
    return dogTempName;
};




// Crear nuevos Perros
const dogCreated = async (name, height, weight, life_span, temperament, image, created) => {
    // const { name, height, weight, life_span, temperament, image, created } = req.body;

    try {
        const newDog = await Dogs.create({
            name,
            height,
            weight,
            life_span,
            image,
            created,
            temperament,
        });

        temperament.map(async el => {
            const findTemp = await Temperaments.findAll({
                where: { name: el }
            })
            newDog.addTemperaments(findTemp);
            console.log('tempe', findTemp);
        })

        // let tempDb = await Temperaments.findAll({
        //     where: {
        //         name: {
        //             [Op.iLike]: temperament.trim().toLowerCase() // Búsqueda insensible a mayúsculas/minúsculas
        //         }
        //     }
        // });
        // console.log('tempeDB', tempDb);
        if (!newDog) throw new Error('Error al crear el perro')
        return newDog; // Devuelve el nuevo perro creado
    }
    catch (error) {
        throw error; // Lanza el error para que sea manejado en el controlador
    }

};

// const dogCreated = async (name, height, weight, life_span, temperament, image, created) => {
//     const newDog = await Dogs.create({
//         name,
//         height,
//         weight,
//         life_span,
//         image,
//         created,
//         temperament: temperament
//     })
//     if (!newDog) {
//         throw new Error('Error al crear el perro')
//     }
// }

// Buscar perros por ID
const getDogById = async (id) => {
    console.log('entre al controler de id');
    const dogs = await getAllDogs()
    const dogId = dogs.filter(objeto => objeto.id.toString() === id);
    if (dogId.length <= 0) {
        throw new Error(`No existen perros con el id: '${id}'`)
    }
    return dogId
}

// Buscar perros por nombre

const getDogByName = async (name) => {
    const dogs = await getAllDogs();

    const dogName = dogs.filter((objeto) => objeto.name.toLowerCase().includes(name.toLowerCase()));

    if (dogName.length === 0) {
        throw new Error(`No existen perros de raza: '${name}'`)
    }
    return dogName
}

// Traer todos los temperamentos

const getAllTemperaments = async () => {
    // let dataTemps = (await axios.get(URL)).data;
    const dogs = await getAllDogs()
    let apiTemps = dogs.map(dog => {
        const temperaments = dog.temperament?.split(",") || [];
        return temperaments.map(temp => temp.trim().replace(/-/g, ''));
    });
    const arrTemps = [].concat(...apiTemps);
    const borrarDuplicados = new Set(arrTemps);
    await Promise.all([...borrarDuplicados].map(async temp => {
        if (temp) {
            await Temperaments.findOrCreate({
                where: { name: temp },
            });
        }
    }));

    const allTemperamentsDB = await Temperaments.findAll();

    return allTemperamentsDB;
}

// Buscar temperamentos por nombre

const getTemperamentsName = async (name) => {
    const tempName = await Temperaments.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    });

    if (!tempName || tempName.length === 0) {
        throw new Error(`El temperamento '${name}' no existe`);
    }

    const nameTemp = tempName.map(temp => {
        return {
            id: temp.id,
            name: temp.name,
            created: temp.created
        };
    });

    return nameTemp;
};

module.exports = { getDogsApi, getDogsDb, getAllDogs, dogCreated, getDogById, getDogByName, getAllTemperaments, getTemperamentsName, getDogByTemperament }
