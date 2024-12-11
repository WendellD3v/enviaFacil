// Zeus isso aqui é uma api REST Feita pelo "Aluno do segundo periodo"

const express = require('express');
const router = express.Router();
const verify = require('../middlewares/verifications');

require('dotenv').config()

// Models 
const { getAccount, createAccount, chgPass, verificarMatricula } = require('../models/login');

// Realizar Login
router.get('/', verify, getAccount)

// Realizar Cadastro
router.post('/', verify, createAccount)

router.patch('/', verify, chgPass)

// Verifica matricula (Simula o JWT)
router.get(`/${process.env.APIKEY}`, verify, verificarMatricula)


module.exports = router;