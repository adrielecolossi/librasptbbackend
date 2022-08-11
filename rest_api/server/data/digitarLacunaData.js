const db = require("../infra/database");


exports.saveQuestaoDigitarLacuna = async function (questao) {
    try{
    result = await db.query(
      "insert into questao (id) values((SELECT max(id)+1 from questao)) RETURNING id;"
    );
    const sql = "insert into preencherdigitando(questao, frase, resposta) values ($1, $2, $3)"
    result2 = await db.query(sql, [result.rows[0].id, questao.frase, questao.resposta]
    );
    let sqlInsertQuestaoCategoria = "insert into questaocategoria(questao, categoria) values ($1, $2);"
    let result3;

    for (let i = 0; i < questao.categoria.length; i++) {
      result3 = await db.query(sqlInsertQuestaoCategoria, [result.rows[0].id ,questao.categoria[i]] 
      );
    }

    return ({ message: "Questão salva com sucesso" });
} catch(error){
    return ({ message: "Falha ao criar" });
}
    
    
  };
  
  


exports.getQuestaoDigitarLacuna= async  function(categoria){


    let sqlGetAssociar = "select * from preencherdigitando join questao on preencherdigitando.questao= questao.id join questaocategoria on questaocategoria.questao= questao.id where categoria=$1;"
  let result = await db.query(sqlGetAssociar, [categoria])

  return result.rows;
  }


  
exports.putQuestaoDigitarLacuna = async function(questao){  
    if(questao.categoria==[]){
      return ({ message: 'Nenhuma alteração realizada pois as categorias estavam em branco' });
    } else {

        try{
        let sql= "delete from questaocategoria where questao= $1"
      let result  = await db.query(sql, [questao.id])
      
      let result2;

      let sqlInsertQuestaoCategoria = "insert into questaocategoria(questao, categoria) values ($1, $2);"
      for (let i = 0; i < questao.categoria.length; i++) {
        result2 = await db.query(sqlInsertQuestaoCategoria, [questao.id ,questao.categoria[i]] 
        );
      }
    
    if(questao.frase!== ''){
        const sqlUpdate = "UPDATE preencherdigitando SET frase = $1 WHERE questao = $2"
      result = await db.query(sqlUpdate, [questao.frase, questao.id])
    }
    if(questao.resposta!== ''){
        const sqlUpdate = "UPDATE preencherdigitando SET resposta = $1 WHERE questao = $2"
      result = await db.query(sqlUpdate, [questao.resposta, questao.id])
    }

    return ({ message: "Alterações feitas com sucesso" });
        } catch(error){
          console.log(error)
            return ({ message: "Falha ao editar" });
        }    
    }
    
    }

exports.excluirQuestaoDigitarLacuna = async function(questao){


    try{
        const sql= "delete from questaocategoria where questao = $1"
      const result = await db.query(sql, [questao.id]);
      const sql2= "delete from preencherdigitando  where questao = $1"
      const result2 = await db.query(sql2, [questao.id]);
      const sql3= "delete from questao where id= $1"
      const result3 = await db.query(sql3, [questao.id]);
      return ({ message: "Alterações feitas com sucesso" });
      } catch(error){
        return ({ message: "Falha ao excluir" });
      }

  }