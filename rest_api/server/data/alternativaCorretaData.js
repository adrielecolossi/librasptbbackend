const db = require("../infra/database");

exports.saveQuestaoMarcarMidia = async function (questao) {
  try {
    result = await db.query(
      "insert into questao (id) values((SELECT max(id)+1 from questao)) RETURNING id;"
    );

    let sqlInsert = "insert into marcar(questao, midia, opcao1, opcao2, opcao3, opcao4, opcao5) values ($1, $2, $3, $4, $5, $6, $7);"
    let result2;
    result2 = await db.query(sqlInsert, [
      result.rows[0].id,
      questao.midia,
      questao.alternativaCerta,
      questao.alternativaErrada1,
      questao.alternativaErrada2,
      questao.alternativaErrada3,
      questao.alternativaErrada4
    ]
    );
    let result3;

    let sqlInsertCategoria = "insert into questaocategoria(questao, categoria) values ($1, $2)";
    for (let i = 0; i < questao.categoria.length; i++) {

      result3 = await db.query(sqlInsertCategoria, [result.rows[0].id, questao.categoria[i]]);
    }
    return ({ msg: "Questão salva com sucesso" });
  } catch (error) { 
    return ({ msg: "Falha ao criar" });
  }
};




exports.getQuestaoMarcarMidia = async function (categoria) {
  let sqlGetAssociar = "select * from marcar join questao on marcar.questao= questao.id join questaocategoria on questaocategoria.questao= questao.id where categoria=$1;"
  let result = await db.query(sqlGetAssociar, [categoria])

  return result.rows;
}


exports.putQuestaoMarcarMidia = async function (questao) {

  try {
    if (questao.categoria == []) {
      return ({ message: 'Nenhuma alteração realizada pois as categorias estavam em branco' });
    } else {
      let sqlExcluirCategorias = "delete from questaocategoria where questao=$1"
      let result = await db.query(sqlExcluirCategorias, [questao.id]);

      let sqlInsertQuestaoCategoria = "insert into questaocategoria(questao, categoria) values ($1, $2);"
      let result2;

      for (let i = 0; i < questao.categoria.length; i++) {
        result2 = await db.query(sqlInsertQuestaoCategoria, [questao.id, questao.categoria[i]]
        );
      }

      let result3;
      let sqlUpdate;
      if (questao.midia !== '') {
        sqlUpdate = "UPDATE marcar SET midia = $1 WHERE questao = $2"
        result3 = await db.query(sqlUpdate, [questao.midia, questao.id]);

        // return ({ message: 'Alterações feitas com sucesso' });
      }

      if (questao.opcao1 !== '') {
        sqlUpdate = "UPDATE marcar SET opcao1 = $1 WHERE questao = $2"
        result3 = await db.query(sqlUpdate, [questao.opcao1, questao.id]);
        // return ({ message: 'Alterações feitas com sucesso' });
      }
      if (questao.opcao2 !== '') {
        sqlUpdate = "UPDATE marcar SET opcao2 = $1 WHERE questao = $2"
        result3 = await db.query(sqlUpdate, [questao.opcao2, questao.id]);
        // return ({ message: 'Alterações feitas com sucesso' });
      }
      if (questao.opcao3 !== '') {
        sqlUpdate = "UPDATE marcar SET opcao3 = $1 WHERE questao = $2"
        result3 = await db.query(sqlUpdate, [questao.opcao3, questao.id]);
        // return ({ message: 'Alterações feitas com sucesso' });
      }
      if (questao.opcao4 !== '') {
        sqlUpdate = "UPDATE marcar SET opcao4 = $1 WHERE questao = $2"
        result3 = await db.query(sqlUpdate, [questao.opcao4, questao.id]);
      }
      if (questao.opcao5 !== '') {
        sqlUpdate = "UPDATE marcar SET opcao5 = $1 WHERE questao = $2"
        result3 = await db.query(sqlUpdate, [questao.opcao5, questao.id]);
      }

      return ({ message: 'Alterações feitas com sucesso' });

    }
  } catch (error) {
    return ({ message: "Falha ao editar" });
  }
}


exports.excluirQuestaoMarcarMidia = async function (questao) {
  try {

    const sql = "delete from questaocategoria where questao = $1"
    const result = await db.query(sql, [questao.id]);
    const sql2 = "delete from marcar where questao = $1"
    const result2 = await db.query(sql2, [questao.id]);
    const sql3 = "delete from questao where id= $1"
    const result3 = await db.query(sql3, [questao.id]);
    return ({ message: "Alterações feitas com sucesso" });
  } catch (error) {
    return ({ message: "Falha ao excluir" });
  }
}