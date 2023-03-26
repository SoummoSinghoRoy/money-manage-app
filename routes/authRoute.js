const router = require('express').Router()

const { 
  userRegistrationPostController, 
  userlogInPostController } = require('../controllers/authController');

router.post('/registration', userRegistrationPostController);

router.post('/login', userlogInPostController)

module.exports = router;