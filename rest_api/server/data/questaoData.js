const { query, json } = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const db = require("../infra/database");
const fs = require("fs");
const path = require("path");
const axios = require("axios").default;
var md5 = require("md5");



exports.getCategoriasdaQuestao = async function(questao){
  const result  = await db.query("select categoria from questaocategoria where questao=" + questao)
  return result.rows;
}

exports.getQuestao = async function () {
  result = await db.query("select * from preencherdigitando");
  return result.rows;
};
exports.getQuestaoId = async function (id) {
  result = await db.query("select * from questao where id =" + id);
  return result.rows;
};
exports.getCategoria = async function () {
  result = await db.query("select * from categoria");
  return result.rows;
};
exports.getSenha = async function (email) {
  result = await db.query(
    "select usuariobanco.senha from usuariobanco where usuariobanco.email='" +
      email +
      "'"
  );
  return result.rows;
};
exports.getSenhaApp = async function (email) {
  result = await db.query(
    "select jogador.senha from jogador where jogador.email='" + email + "'"
  );
  return result.rows;
};
exports.getUser = async function (email) {
  result = await db.query(
    "select usuariobanco.nome from usuariobanco where usuariobanco.email = '" +
      email +
      "'"
  );
  return result.rows;
};
exports.checkExistence = async function (email) {
  result = await db.query(
    "select nome from jogador where email='" + email + "'"
  );
  return result.rows;
};
exports.cadastrarUsuario = function (
  email,
  nome,
  genero,
  datadenascimento,
  senha
) {
  
  // return db.none("insert into jogador(email,senha,nome,genero, datadenascimento) values ('"+ email + "', '" + senha +"', '"+ nome +"', "+ genero +", '" + datadenascimento +"' )");
};
exports.Login = function (req, res, next) {
  
};
exports.saveQuestao = async function (questao) {
  //if(questao.AC == "on"){
  
  //return db.none("insert into associar(opcao1, opcao2, opcao3, opcao4, opcao5, opcao6, opcao7, opcao8, opcao9, opcao10) values ('"+ questao.coluna1 +"','" + questao.coluna2+ "','" + questao.coluna3 +"','" + questao.coluna4 + "','"+ questao.coluna5 + "','"+ questao.coluna6 + "','" + questao.coluna7 + "','" + questao.coluna8 + "','" + questao.coluna9 + "','" + questao.coluna10 + "')'");
  //}
  //return db.none('insert into preencherdigitando(frase, resposta) values(oi, bom dia)')
  //return db.none('insert into blabla returning')
};

