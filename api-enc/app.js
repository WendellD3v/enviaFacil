const express = require('express');
const App = express();
require('dotenv').config();

const cors = require('cors')

// Uso do body parse
App.use(express.json());

// Uso do cors

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['x-api-key', 'Authorization', 'Content-Type', 'Custom-Header']
};

App.use(cors(corsOptions))

// Banco de dados
require('./src/models/connection')

// Rotas
const Login = require('./src/routes/login');
const Envio = require('./src/routes/envio')
App.use('/api/login', Login)
App.use('/api/send', Envio)


// Inicialização da api
App.listen(process.env.PORT, () => {
    console.log(`Servidor ativo em http://localhost:${process.env.PORT}/`)
})