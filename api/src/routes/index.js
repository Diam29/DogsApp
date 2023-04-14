const { Router } = require('express');
const dogsRoute = require('./DogsRoute.js');
const temperamentsRoute = require('./TemperamentsRoute.js');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const miRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

miRouter.use("/dogs", dogsRoute);
miRouter.use("/temperaments", temperamentsRoute);


module.exports = miRouter;
