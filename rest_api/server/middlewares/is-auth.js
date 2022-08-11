
const isAuth = (req, res, next) => {
    const jwt = require('jsonwebtoken');

    const tokenRecebido = req.body.token || req.query.token 
    //let questao = req.body;
    let decodedToken;
    try {
      decodedToken = jwt.verify(tokenRecebido, 'somesupersecretsecret');

      if(decodedToken) return next()
    } catch (err) {
      err.statusCode = 500;
      return res.json({ msg: 'Falha ao cadastrar uma questão. Faça primeiro o login.' })
    }
}

module.exports = { isAuth };