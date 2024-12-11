const mysql = require('mysql2/promise')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'enviafacil',
});

connection.then(conn => {
    console.log('Conectado ao banco de dados com sucesso!'); 
}).catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err); 
});

module.exports = connection