var express = require('express');
var router   = express.Router();
var bcry    = require('bcrypt');

//middleware para validar el body de la peticion post
var validationAuth = require('../middleware/validation_user');

//Controllers
const register = require('../controllers/Auth/register');
const login    = require('../controllers/Auth/login');

router.post('/login', login);

router.post('/register', validationAuth, register);

module.exports = router;