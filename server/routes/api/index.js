const router = require('express').Router();
const userRoutes = require('./user-routes');
const ranchoRoutes = require('./rancho-routes');

router.use('/ranchos', ranchoRoutes);

router.use('/users', userRoutes);

module.exports = router