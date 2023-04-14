const { getAllTemperaments } = require('../controllers/controller')

const getTemperaments = async (req, res) => {
    try {
        let resultsTemps = await getAllTemperaments();
        return res.status(200).json(resultsTemps);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getTemperaments }