const router = require('express').Router();
const { getServices } = require('../controllers/serviceController');

router.get('/get-service', getServices);

module.exports = router;
