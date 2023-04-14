const express = require('express');
const { Router } = require('express');
const { getTemperaments } = require('../handlers/TemperamentHanlder');

const temperamentsRoute = Router();

temperamentsRoute.get('/', getTemperaments)

// temperamentRoute.get("/temperament", async (req, res) => {
//     const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`);
//     const temperaments = temperamentsApi.data.map(t => t.temperament);
//     const temps = temperaments.toString().split(",");
//     temps.forEach(el => {
//         let i = el.trim()
//         Temperament.findOrCreate({
//             where: { name: i }
//         })
//     })

//     const allTemp = await Temperament.findAll();
//     res.send(allTemp);
// });


module.exports = temperamentsRoute 