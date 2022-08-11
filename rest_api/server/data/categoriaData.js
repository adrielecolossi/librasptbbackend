const { query } = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const database = require('../infra/database')
const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
var md5 = require('md5');

exports.saveCategoria = async function(categoria){ 
    result = await database.query("insert into categoria(nome, midia) values ('"+ categoria.nome + "', '" + categoria.midia + "' );");
    return result.rows;  
}
exports.editCategoria = async function(categoria){ 
   if(categoria.midia=='' && categoria.nome==''){
    return ({ message: 'Nenhuma alteração realizada pois ambos estavam em branco' });
   }
   if(categoria.midia!=='' && categoria.nome===''){
    result = await database.query("UPDATE categoria SET midia = '"+categoria.midia +"' WHERE id = "+ categoria.id)
return    ({ message: 'Categoria atualizada com sucesso' });
}
if(categoria.midia==='' && categoria.nome!==''){
    result = await database.query("UPDATE categoria SET nome = '"+categoria.nome +"' WHERE id = "+ categoria.id)
return    ({ message: 'Categoria atualizada com sucesso' });
}
if(categoria.midia!=='' && categoria.nome!==''){
    result = await database.query("UPDATE categoria SET nome = '"+categoria.nome +"' WHERE id = "+ categoria.id)
    result = await database.query("UPDATE categoria SET midia = '"+categoria.midia +"' WHERE id = "+ categoria.id)
return    ({ message: 'Categoria atualizada com sucesso' });
}
}

exports.deleteCategoria = async function(categoria){ 
    result = await database.query("delete from questaocategoria where categoria=" + categoria.id + ";" )
    result2 = await database.query("delete from categoria where id=" + categoria.id + ";" );
  
    return result2;  
}
