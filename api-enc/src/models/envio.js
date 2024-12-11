const connection = require('./connection');

const addDoc = async function (req, res) {
    
    if (!req.body['author'] || !req.body['authorname'] || !req.body['filename']){
        return res.status(400).json({mensagem: 'Não autorizado'})
    }

    const connect = await connection;
    try {
        const [ result ] = await connect.query(`INSERT INTO files(author, authorname, filename, status, comment) VALUES(?, ?, ?, ?, ?)`, [req.body['author'],req.body['authorname'], req.body['filename'], 0, ''])
    
        res.status(200).json({insertID: result['insertId'], mensagem: "Arquivo enviado com sucesso"})
    } catch (error) {
        res.status(400).json({mensagem: 'Problema ao se conectar com o banco de dados'})
    }

}

const getDocs = async function(req, res) {
    const connect = await connection;
    if (req.query['author']){
        
        try {
            const [ result ] = await connect.query(`SELECT * FROM files WHERE author = ?`, [parseInt(req.query['author'])])
        
            res.status(200).json({arquivos: result})
        } catch (error) {
            res.status(400).json({mensagem: 'Problema ao se conectar com o banco de dados'})
        }

    } else {
        try {
            const [ result ] = await connect.query(`SELECT * FROM files`)
        
            res.status(200).json({arquivos: result})
        } catch (error) {
            res.status(400).json({mensagem: 'Problema ao se conectar com o banco de dados'})
        }
    }

}

const updateStatus = async function(req, res) {
    
    if (!req.body['id'] || !req.body['status']){
        return res.status(400).json({mensagem: 'Não autorizado'})
    }

    const connect = await connection;
    if (req.body['status'] === 1){
        
        try {
            const [ result ] = await connect.query('UPDATE files SET status = ? WHERE id = ?', [req.body['status'], req.body['id']])

            res.status(200).send()
        } catch (error) {
            res.status(400).json({mensagem: 'Problema ao se conectar com o banco de dados'})
        }
    } else if (req.body['status'] === 2){

        if (!req.body['comment']){
            return res.status(400).json({mensagem: 'Não autorizado'})
        }

        try {
            const [ result ] = await connect.query('UPDATE files SET status = ?, comment = ? WHERE id = ?', [req.body['status'], req.body['comment'], req.body['id']])

            res.status(200).send()
        } catch (error) {
            res.status(400).json({mensagem: 'Problema ao se conectar com o banco de dados'})
        }
    }
}

module.exports = {
    addDoc,
    getDocs,
    updateStatus
}