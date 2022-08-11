const db = require("../infra/database");

exports.saveQuestaoAssociarColunas = async function (questao) {
try{
let  result = await db.query(
    " insert into questao (id) values((SELECT max(id)+1 from questao)) RETURNING id;"
  );

 let sqlAssociar = "insert into associar(questao, opcao1, opcao2, opcao3, opcao4, opcao5, opcao6, opcao7, opcao8, opcao9, opcao10) values ($1, $2, $3,$4, $5, $6, $7, $8, $9, $10, $11);"
 let result2 = await db.query(sqlAssociar, [result.rows[0].id, questao.opcao1,  questao.opcao2,  questao.opcao3,  questao.opcao4,  questao.opcao5,  questao.opcao6,  questao.opcao7,  questao.opcao8,  questao.opcao9,  questao.opcao10 ])
 let result3;

 let sqlInsert = "insert into questaocategoria(questao, categoria) values ($1, $2)";
 for (let i = 0; i < questao.categoria.length; i++) {
 
    result3 = await db.query(sqlInsert, [result.rows[0].id, questao.categoria[i]]);
  }
  return ({ message: "Questão salva com sucesso" });
} catch(error){
  return ({ message: "Falha ao criar" });
}

};

exports.getQuestaoAssociarColunas = async function (categoria) {
  
  let sqlGetAssociar = "select * from associar join questao on associar.questao= questao.id join questaocategoria on questaocategoria.questao= questao.id where categoria=$1;"
  let result = await db.query(sqlGetAssociar, [categoria])

  return result.rows;
};

exports.putQuestaoAssociarColunas = async function (questao) {
  if (questao.categoria == []) {
    return {
      message:
        "Nenhuma alteração realizada pois as categorias estavam em branco",
    };
  } else {

    try{
    let sqlExcluirCategorias = "delete from questaocategoria where questao=$1"
    let result = await db.query(sqlExcluirCategorias, [questao.id]);

    let sqlInsertQuestaoCategoria = "insert into questaocategoria(questao, categoria) values ($1, $2);"
    let result2;

    for (let i = 0; i < questao.categoria.length; i++) {
      result2 = await db.query(sqlInsertQuestaoCategoria, [questao.id ,questao.categoria[i]] 
      );
    }
let result3;
let sqlUpdate;
    if (questao.novaOpcao1 !==  undefined) {
     sqlUpdate= "UPDATE associar SET opcao1 = $1 WHERE questao = $2"
      result3 = await db.query(sqlUpdate, [questao.novaOpcao1, questao.id]);
     
    }
    if (questao.opcao2 !== "") {
      sqlUpdate= "UPDATE associar SET opcao2 = $1 WHERE questao = $2"
      result3 = await db.query(sqlUpdate, [questao.opcao2, questao.id]);

    }
    if (questao.novaOpcao3 !==  undefined) {
      sqlUpdate= "UPDATE associar SET opcao3 = $1 WHERE questao = $2"
            result3 = await db.query(sqlUpdate, [questao.novaOpcao3, questao.id]);
     
    }
    if (questao.opcao4 !==  "") {
      sqlUpdate= "UPDATE associar SET opcao4 = $1 WHERE questao = $2"

      result3 = await db.query(sqlUpdate, [questao.opcao4, questao.id]);
    }
    if (questao.novaOpcao5 !==  undefined) {
      sqlUpdate= "UPDATE associar SET opcao5 = $1 WHERE questao = $2"

      result3 = await db.query(sqlUpdate, [questao.novaOpcao5, questao.id]);
    }
    if (questao.opcao6 !==  "") {
      sqlUpdate= "UPDATE associar SET opcao6 = $1 WHERE questao = $2"

      result3 = await db.query(sqlUpdate, [questao.opcao6, questao.id]);
    }
    if (questao.novaOpcao7 !==  undefined) {
      sqlUpdate= "UPDATE associar SET opcao7 = $1 WHERE questao = $2"
      result3 = await db.query(sqlUpdate, [questao.novaOpcao7, questao.id])
    }
    if (questao.opcao8 !==  "") {
      sqlUpdate= "UPDATE associar SET opcao8 = $1 WHERE questao = $2"
      result3 = await db.query(sqlUpdate, [questao.opcao8, questao.id])
    }
    if (questao.novaOpcao9 !==  undefined) {
      sqlUpdate= "UPDATE associar SET opcao9 = $1 WHERE questao = $2"
      result3 = await db.query(sqlUpdate, [questao.novaOpcao9, questao.id])
    }

    if (questao.opcao10 !== undefined) {
      sqlUpdate= "UPDATE associar SET opcao10 = $1 WHERE questao = $2";
      result3 = await db.query(sqlUpdate, [questao.opcao10, questao.id]);
    }
    return ({ message: "Alterações feitas com sucesso" });
    } catch(error){
      return ({ message: "Falha ao editar" });
    }
  }
};

exports.excluirQuestaoAssociarColunas = async function (questao) {
  try{

    const sql= "delete from questaocategoria where questao = $1"
  const result = await db.query(sql, [questao.id]);
  const sql2= "delete from associar where questao = $1"
  const result2 = await db.query(sql2, [questao.id]);
  const sql3= "delete from questao where id= $1"
  const result3 = await db.query(sql3, [questao.id]);
  return ({ message: "Alterações feitas com sucesso" });
  } catch(error){
    return ({ message: "Falha ao excluir" });
  }

};
