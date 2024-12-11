require('dotenv').config()

// Achou que ia ver JWT? Achou errado, vai ser apenas api key mesmo
const verify = function(req, res, next){
    
    if(req.headers['x-api-key'] == process.env.APIKEY){
        return next()
    } else{
        return res.status(401).send('Não foi autorizado')
    }
    
}

module.exports = verify;