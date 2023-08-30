const { Router } = require('express');
const dogsRoute = require('./DogsRoute.js');
const temperamentsRoute = require('./TemperamentsRoute.js');





const miRouter = Router();



miRouter.use("/dogs", dogsRoute);
miRouter.use("/temperaments", temperamentsRoute);


module.exports = miRouter;