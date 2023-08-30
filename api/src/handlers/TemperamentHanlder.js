const { Dogs, Temperaments } = require('../db.js')


const { getAllTemperaments, getTemperamentsName } = require('../controllers/allControllerDogsTemp.js')

const getTemperaments = async (req, res) => {
    try {
        const resultsTemps = await getAllTemperaments();
        return res.status(200).json(resultsTemps);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTemperamentsByName = async (req, res) => {
    const { name } = req.query
    try {
        const tempName = await getTemperamentsName(name)
        res.status(200).json(tempName)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};

module.exports = { getTemperaments, getTemperamentsByName }