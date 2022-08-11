const { Client } = require('pg')
const db = new Client({
    connectionString: 'postgres://xszewiwbllkhlg:377f81f877c0641b0efdb07934627b8a997569e7e835ae87c6db9f3069320dd6@ec2-3-224-8-189.compute-1.amazonaws.com:5432/d89uk2cdao4i1b',
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect(err => {
    if (err) {
        console.log("ERRO!!! NAO FOI POSSIVEL CONECTAR NO BANCO");
        console.log( { err });
    } else {
        console.log("BANCO CONECTADO COM SUCESSO");
    }
});
module.exports = db;

/*const pgp = require('pg-promise')();
const db= pgp({
    user: 'postgres',
    password: 'postgres',
    host:'localhost',
    port: 5432,
    database: 'librasptb'
})

module.exports = db;

*/
