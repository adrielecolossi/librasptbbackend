const questaoData = require('../data/questaoData');
const associarColunasData = require('../data/associarColunasData');
const digitarLacunaData = require('../data/digitarLacunaData');
const ordenarFraseData = require('../data/ordenarFraseData');
const digitarMidiaData = require('../data/digitarMidiaData');
const marcarLacunaData = require('../data/marcarLacunaData');
const fraseCorretaData = require('../data/fraseCorretaData');
const alternativaCorretaData = require('../data/alternativaCorretaData');
const categoriaData = require('../data/categoriaData');
exports.getQuestao = function(){
    return questaoData.getQuestao();
}
exports.saveQuestao = function(questao){
    return questaoData.saveQuestao(questao)
}
exports.getQuestaoId = function(id){
    return questaoData.getQuestaoId(id)
}
exports.checkExistence = function(email){
    return questaoData.checkExistence(email)
}
exports.getCategoria = function(){
    return questaoData.getCategoria()
}
exports.saveQuestaoDigitarMidia= async  function(questao){
    result = await digitarMidiaData.saveQuestaoDigitarMidia(questao);
    return result;
}

exports.getQuestaoDigitarMidia= async  function(categoria){
    result = await digitarMidiaData.getQuestaoDigitarMidia(categoria);
    return result;
}

exports.putQuestaoDigitarMidia= async  function(questao){
    result = await digitarMidiaData.putQuestaoDigitarMidia(questao);
    return result;
}


exports.saveQuestaoOrdenarFrase= async  function(questao){
    result = await ordenarFraseData.saveQuestaoOrdenarFrase(questao);
    return result;
}

exports.getQuestaoOrdenarFrase= async  function(categoria){
    result = await ordenarFraseData.getQuestaoOrdenarFrase(categoria);
    return result;
}



exports.putQuestaoOrdenarFrase= async  function(questao){
    result = await ordenarFraseData.putQuestaoOrdenarFrase(questao);
    return result;
}

exports.saveQuestaoMarcarLacuna= async  function(questao){

    result = await marcarLacunaData.saveQuestaoMarcarLacuna(questao);
    return result;
}


exports.getQuestaoMarcarLacuna= async  function(categoria){
    
      result = await marcarLacunaData.getQuestaoMarcarLacuna(categoria);
      return result;
  }

  exports.putQuestaoMarcarLacuna= async function(questao){

    result = await marcarLacunaData.putQuestaoMarcarLacuna(questao);
    return result;
}

exports.excluirQuestaoMarcarLacuna = async function(questao){

    result = await marcarLacunaData.excluirQuestaoMarcarLacuna(questao);
    return result;
}


exports.saveQuestaoAssociarColunas= async  function(questao){
    result = await associarColunasData.saveQuestaoAssociarColunas(questao);
    return result;
}
exports.getQuestaoAssociarColunas= async  function(categoria){
    result = await associarColunasData.getQuestaoAssociarColunas(categoria);
    return result;
}

exports.putQuestaoAssociarColunas= async  function(questao){
    result = await associarColunasData.putQuestaoAssociarColunas(questao);
    return result;
}

exports.getCategoriasdaQuestao = async function(questao){
    result = await questaoData.getCategoriasdaQuestao(questao);
    return result;
}

exports.excluirQuestaoAssociarColunas = async function(questao){

    result = await associarColunasData.excluirQuestaoAssociarColunas(questao);
    return result;
}

exports.excluirQuestaoOrdenarFrase = async function(questao){

    result = await ordenarFraseData.excluirQuestaoOrdenarFrase(questao);
    return result;
}

exports.saveQuestaoFraseCorreta= async  function(questao){
    result = await fraseCorretaData.saveQuestaoFraseCorreta(questao);
    return result;
}
exports.saveQuestaoDigitarLacuna= async  function(questao){
    result = await digitarLacunaData.saveQuestaoDigitarLacuna(questao);
    return result;
}


exports.getQuestaoDigitarLacuna= async  function(questao){
    
      result = await digitarLacunaData.getQuestaoDigitarLacuna(questao);
      return result;
  }

  exports.putQuestaoDigitarLacuna= async function(questao){

    result = await digitarLacunaData.putQuestaoDigitarLacuna(questao);
    return result;
}

exports.excluirQuestaoDigitarLacuna = async function(questao){

    result = await digitarLacunaData.excluirQuestaoDigitarLacuna(questao);
    return result;
}


exports.saveQuestaoMarcarMidia= async  function(questao){
    result = await alternativaCorretaData.saveQuestaoMarcarMidia(questao);
    return result;
}


exports.getQuestaoMarcarMidia= async  function(categoria){
      result = await alternativaCorretaData.getQuestaoMarcarMidia(categoria);
      return result;
  }

  exports.getQuestaoFraseCorreta= async  function(categoria){
    result = await fraseCorretaData.getQuestaoFraseCorreta(categoria);
    return result;
}


exports.putQuestaoMarcarMidia= async function(questao){

    result = await alternativaCorretaData.putQuestaoMarcarMidia(questao);
    return result;
}
exports.putQuestaoFraseCorreta= async function(questao){

    result = await fraseCorretaData.putQuestaoFraseCorreta(questao);
    return result;
}


exports.excluirQuestaoDigitarMidia = async function(questao){

    result = await digitarMidiaData.excluirQuestaoDigitarMidia(questao);
    return result;
}
exports.excluirQuestaoMarcarMidia = async function(questao){

    result = await alternativaCorretaData.excluirQuestaoMarcarMidia(questao);
    return result;
}
exports.excluirQuestaoFraseCorreta = async function(questao){

    result = await fraseCorretaData.excluirQuestaoFraseCorreta(questao);
    return result;
}

  
exports.Login = function(req, res, next){
    return questaoData.Login(req)
}
exports.getSenha = function(email){
    return questaoData.getSenha(email);
}
exports.getSenhaApp = function(email){
    return questaoData.getSenhaApp(email);
}
exports.getUser = function(email){
    return questaoData.getUser(email);
}
exports.cadastrarUsuario = function(email,nome,genero, datadenascimento, senha){
    return questaoData.cadastrarUsuario(email,nome,genero, datadenascimento, senha);
}

exports.saveCategoria = function(categoria){
    return categoriaData.saveCategoria(categoria);
}
exports.editCategoria = function(categoria){
    return categoriaData.editCategoria(categoria);
}

exports.deleteCategoria = function(categoria){
    return categoriaData.deleteCategoria(categoria);
}
