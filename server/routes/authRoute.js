const router = require('express').Router();
const { registration, login } = require('../controllers/authController');

router.post('/registration', registration);
router.post('/login', login);

module.exports = router;