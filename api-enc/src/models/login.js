const connection = require('./connection');


// Sistema De Login
const getAccount = async function(req, res){

    if (!req.query){
        res.status(401).json({mensagem: 'Informações em falta (Params)'})
        return 
    }
    if (!req.query['matricula']){
        res.status(401).json({mensagem: 'Informações em falta (Matricula)'})
        return 
    }

    if (!req.query['senha']){
        res.status(401).json({mensagem: 'Informações em falta (Senha)'})
        return 
    }

    // Quer verificação em hash? Faça Você mesmo!
    try {
        const connect = await connection;
        const [ verify ] = await connect.query(`SELECT * FROM accounts WHERE matricula = ?`, [req.query['matricula']]);
        
        if (verify.length > 0){
            if (verify[0]['senha'] === req.query['senha']){
                res.status(200).json({matricula: verify[0]['matricula'], nome: verify[0]['nome'], accountType: verify[0]['tipo'], mensagem: 'Login realizado com sucesso'})
            } else{
                res.status(401).json({mensagem: 'Senha incorreta'})
            }
        } else {
            res.status(404).json({mensagem: 'Usuário não encontrado'})
        }
    } catch(err){
        res.status(400).json({mensagem: 'Banco de dados não conectado'})
    }
}


// Sistema de criação de conta
const createAccount = async function(req, res){

    if (!req.body || !req.body['nome'] || !req.body['email'] || !req.body['senha']) {
        return res.status(400).json({mensagem: 'Informações em falta'})
    }

    // Isso sim é um sistema de criação de contas zeus
    try {
        const createConnection = await connection
        const [verify] = await createConnection.query(`SELECT * FROM accounts WHERE email = ?`, [req.body['email']]);

        // Verifica se a conta existe no banco de dados quando for cadastrar
        if (verify.length > 0) {
            res.status(400).json({mensagem: 'Este email já está sendo utilizado em outra conta'});
        } else {

            // Cria a conta no banco de dados de maneira simples
            try{
                const [ result ] = await createConnection.query(`INSERT INTO accounts(nome, email, senha, tipo, cargo) VALUES(?, ?, ?, ?, ?)`, [req.body['nome'], req.body['email'], req.body['senha'], 1, 'Aluno'])

                

                res.status(201).json({insertId: `${result['insertId']}`})
            }catch (err) {
                res.status(401).json({mensagem: 'Erro ao criar conta'})
            }
        }
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
}

// Mudar senha
const chgPass = async function(req, res){
    // Sistema feito baseado no portal do aluno

    // Achou ruim? Reclame com o grupo SER EDUCACIONAL
    

    if (!req.body){
        res.status(401).json({mensagem: 'Informações em falta (Body)'})
        return 
    }
    if (!req.body['matricula']){
        res.status(401).json({mensagem: 'Informações em falta (Matricula)'})
        return 
    }

    if (!req.body['email']){
        res.status(401).json({mensagem: 'Informações em falta (email)'})
        return 
    }   

    if (!req.body['senha']){
        res.status(401).json({mensagem: 'Informações em falta (senha)'})
        return 
    }    

    try{
        const connect = await connection;
        const [ result ] = await connect.query('SELECT * FROM accounts WHERE matricula = ? AND email = ?', [req.body['matricula'], req.body['email']])

        if (result.length > 0){
            const [ newPass ] = await connect.query(`UPDATE accounts SET senha = ? WHERE matricula = ?`, [req.body['senha'], req.body['matricula']])

            res.status(200).json({mensagem: 'Senha alterada com sucesso'})
        } else{
            res.status(400).json({mensagem: 'Conta não localizada'})
        }
    } catch(err){
        res.status(500).send('Erro no servidor');
    }


}

const verificarMatricula = async function(req, res) {

    if (!req.body){
        res.status(401).json({mensagem: 'Informações em falta (Body)'})
        return 
    }
    if (!req.body['matricula']){
        res.status(401).json({mensagem: 'Informações em falta (Matricula)'})
        return 
    }

    try{
        const connect = await connection;
        const [verify] = await connect.query(`SELECT * FROM accounts WHERE matricula = ?`, [req.body['matricula']])
        
        if (verify[0]){
            res.status(200).json({})
        } else {
            res.status(404).json({})
        }
    } catch(err){
        res.status(400).json({mensagem: 'Banco de dados não conectado'})
    }
}

module.exports = {
    getAccount,
    createAccount,
    chgPass,
    verificarMatricula
}