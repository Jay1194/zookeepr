

const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');
const zookeeperRoutes = require('../apiRoutes/zookeeperRoutes');

//add middleware so that our app knows about the routes in animalRoutes.js
router.use(animalRoutes);

// update the file with middleware so that the router uses the new zookeeper routes
router.use(zookeeperRoutes);

module.exports = router;