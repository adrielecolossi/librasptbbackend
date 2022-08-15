const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app= express()
app.use(cors())

const session = require('express-session');
app.use(session({
    secret: 'chave secreta de criptografia',
    resave: false, // NAO SOBRESCREVER CASO NAO HAJA MODIFICAÇÕES,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// PARSER DOS FORMULÁRIOS
app.use(express.urlencoded({
    extended: true,
}));


app.use(bodyParser.json());
/*
app.use(bodyParser.urlencoded({
  extended: true
}));

*/
//app.use(formidableMiddleware());
//são middlewears fszem validação ou filtro ou incluir algo
const rotas =  require('./rest_api/server/routes/questaoRoute.js')

app.use('/', rotas)

//app.use('/', require('./rest_api/server/route/questaoRoute'));
/*
app.get('/', (req, res)=>{
    return res.json({message:'okay'})
})
*/






//app.use('/', require('./rest_api/server/route/questaoRoute'));
/*
app.get('/', (req, res)=>{
    return res.json({message:'okay'})
})
*/




app.listen(process.env.PORT || 3001)
