const db = require("../infra/database");

exports.saveQuestaoOrdenarFrase = async function (questao) {

  try {
    result = await db.query(
      "insert into questao (id) values((SELECT max(id)+1 from questao)) RETURNING id;"
    );

    const sqlInsert = "insert into ordenar(questao, frase) values ($1, $2)"
    result2 = await db.query(sqlInsert, [result.rows[0].id, questao.resposta]);
    let result3;
    let sqlInsertQuestaoCategoria = "insert into questaocategoria(questao, categoria) values ($1, $2)";
    for (let i = 0; i < questao.categoria.length; i++) {

      result3 = await db.query(sqlInsertQuestaoCategoria, [result.rows[0].id, questao.categoria[i]]);
    }
    return ({ message: "Questão salva com sucesso" });
  } catch (error) {
    return ({ message: "Falha ao criar" });
  }

};

exports.getQuestaoOrdenarFrase = async function (categoria) {
  const sql = "select * from ordenar join questao on ordenar.questao= questao.id join questaocategoria on questaocategoria.questao= questao.id where categoria= $1;"
  const result = await db.query(sql, [categoria]);
  return result.rows;
}

exports.putQuestaoOrdenarFrase = async function (questao) {
  try {
    if (questao.categoria == []) {
      return ({ message: 'Nenhuma alteração realizada pois as categorias estavam em branco' });
    } else {
      if (questao.frase == '') {
        return ({ message: 'Nenhuma alteração realizada pois a frase estava em branco' });
      } else {
        const sql = "delete from questaocategoria where questao=$1"
        const result = await db.query(sql, [questao.id])

        let result2;
        const sqlInsertQuestaoCategoria = "insert into questaocategoria(questao, categoria) values ($1, $2)";
        for (let i = 0; i < questao.categoria.length; i++) {

          result2 = await db.query(sqlInsertQuestaoCategoria, [questao.id, questao.categoria[i]]);
        }
      }
    }

    const sqlUpdate = "UPDATE ordenar SET frase = $1 WHERE questao = $2"
    const result3 = await db.query(sqlUpdate, [questao.frase, questao.id])

    return ({ message: 'Alterações feitas com sucesso' });
  } catch (error) {
    return ({ message: 'Erro ao fazer uma alteração' });
  }
}

exports.excluirQuestaoOrdenarFrase = async function (questao) {
  try {
    const sql = "delete from questaocategoria where questao = $1"
    const result = await db.query(sql, [questao.id]);
    const sql2 = "delete from ordenar where questao = $1"
    const result2 = await db.query(sql2, [questao.id]);
    const sql3 = "delete from questao where id= $1"
    const result3 = await db.query(sql3, [questao.id]);
    return ({ message: "Alterações feitas com sucesso" });
  } catch (error) {
    return ({ message: "Falha ao exluir" });
  }
}