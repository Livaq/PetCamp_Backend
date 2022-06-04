const Router = require('express');
const authController = require('../controllers/bothControllers/authController');

const router = new Router();

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.put('/activation', authController.activation);

module.exports = router;
