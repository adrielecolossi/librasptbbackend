const { query, json } = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const db = require("../infra/database");
const fs = require("fs");
const path = require("path");
const axios = require("axios").default;
var md5 = require("md5");



exports.getCategoriasdaQuestao = async function(questao){
  const sql = "select categoria from questaocategoria where questao= $1;"
    const result = await db.query(sql, [questao]);
    return result.rows;
}

exports.getQuestao = async function () {
  result = await db.query("select * from preencherdigitando");
  return result.rows;
};
exports.getQuestaoId = async function (id) {
  const sql = "select * from questao where id = $1;"
  const result = await db.query(sql, [id]);
  return result.rows;
};
exports.getCategoria = async function () {
  result = await db.query("select * from categoria");
  return result.rows;
};
exports.getSenha = async function (email) {
  const sql = "select usuariobanco.senha from usuariobanco where usuariobanco.email= $1;"
  const result = await db.query(sql, [email]);
  return result.rows;
};
exports.getSenhaApp = async function (email) {
  const sql = "select jogador.senha from jogador where jogador.email= $1;"
  const result = await db.query(sql, [email]);
  return result.rows;
};
exports.getUser = async function (email) {
  const sql = "select usuariobanco.nome from usuariobanco where usuariobanco.email= $1;"
  const result = await db.query(sql, [email]);
  return result.rows;
};
exports.checkExistence = async function (email) {
  const sql = "select nome from jogador where email= $1;"
  const result = await db.query(sql, [email]);
  return result.rows;
};
exports.cadastrarUsuario = async function (
  email,
  nome,
  genero,
  datadenascimento,
  senha
) {
  
  const sql = "insert into jogador(email,senha,nome,genero, datadenascimento) values ($1, $2, $3, $4, $5)"
  const result = await db.none(sql, [email, senha, nome, genero, datadenascimento]);

  //return db.none("insert into jogador(email,senha,nome,genero, datadenascimento) values ('"+ email + "', '" + senha +"', '"+ nome +"', "+ genero +", '" + datadenascimento +"' )");
};
exports.Login = function (req, res, next) {
  
};
