const db = require("../infra/database");


exports.saveQuestaoMarcarLacuna = async function (questao) {
try{
    if(questao.categoria==[]){
      return ({ message: 'Nenhuma alteração realizada pois a categoria estava em branco' });
    } else{
    result = await db.query(
      "insert into questao (id) values((SELECT max(id)+1 from questao)) RETURNING id;"
    );
    let sqlInsertQuestaoCategoria = "insert into questaocategoria(questao, categoria) values ($1, $2);"
    let result2;

    for (let i = 0; i < questao.categoria.length; i++) {
      result2 = await db.query(sqlInsertQuestaoCategoria, [result.rows[0].id ,questao.categoria[i]] 
      );
    }
  
    const sqlInsert = "insert into completar(questao, frase, opcao1, opcao2, opcao3, opcao4, opcao5) values ($1, $2, $3, $4, $5, $6, $7)"
    result3 = await db.query(sqlInsert, [result.rows[0].id, questao.frase, questao.opcao1, questao.opcao2, questao.opcao3, questao.opcao4, questao.opcao5])
    }
    return ({ message: "Questão salva com sucesso" });
} catch(error){
    return ({ message: "Falha ao criar" });
}
    
  };

  
exports.getQuestaoMarcarLacuna= async  function(categoria){
    
    const sql = "select * from completar join questao on completar.questao= questao.id join questaocategoria on questaocategoria.questao= questao.id where categoria= $1;"
    const result = await db.query(sql, [categoria]);
    return result.rows;
  
    
  }
  
  exports.putQuestaoMarcarLacuna= async function(questao){
    try{
    if(questao.categoria==[]){
      return ({ message: 'Nenhuma alteração realizada pois as categorias estavam em branco' });
    } else {
        let sqlDelete = "delete from questaocategoria where questao= $1"
      let result  = await db.query(sqlDelete, [questao.id])
             
      let sqlInsertQuestaoCategoria = "insert into questaocategoria(questao, categoria) values ($1, $2);"
      
      let result2;
  
      for (let i = 0; i < questao.categoria.length; i++) {
        result2 = await db.query(sqlInsertQuestaoCategoria, [questao.id ,questao.categoria[i]] 
        );
      }
    
    }
    let result3;
    if(questao.frase!== ''){
        let sql = "UPDATE completar SET frase = $1 WHERE questao = $2 "
      result3 = await db.query(sql, [questao.frase, questao.id])
     // return ({ message: 'Alterações feitas com sucesso' });
    }
    if(questao.opcao1!== ''){
        let sql = "UPDATE completar SET opcao1 = $1 WHERE questao = $2 "
        result3 = await db.query(sql, [questao.opcao1, questao.id])
     // return ({ message: 'Alterações feitas com sucesso' });
    }
    if(questao.opcao2!== ''){
        let sql = "UPDATE completar SET opcao2 = $1 WHERE questao = $2 "
        result3 = await db.query(sql, [questao.opcao1, questao.id])
     // return ({ message: 'Alterações feitas com sucesso' });
    }
    if(questao.opcao3!== ''){
        let sql = "UPDATE completar SET opcao3 = $1 WHERE questao = $2 "
        result3 = await db.query(sql, [questao.opcao3, questao.id])
    }
    if(questao.opcao4!== ''){
        let sql = "UPDATE completar SET opcao4 = $1 WHERE questao = $2 "
        result3 = await db.query(sql, [questao.opcao4, questao.id])
    }
    if(questao.opcao5!== ''){
        let sql = "UPDATE completar SET opcao5 = $1 WHERE questao = $2 "
        result3 = await db.query(sql, [questao.opcao5, questao.id])
    }
    return ({ message: "Alterações feitas com sucesso" });
      } catch(error){
        return ({ message: "Falha ao editar" });
      }
    
    }
  
  exports.excluirQuestaoMarcarLacuna = async function(questao){
    try{
        const sql= "delete from questaocategoria where questao = $1"
      const result = await db.query(sql, [questao.id]);
      const sql2= "delete from completar where questao = $1"
      const result2 = await db.query(sql2, [questao.id]);
      const sql3= "delete from questao where id= $1"
      const result3 = await db.query(sql3, [questao.id]);
      return ({ message: "Alterações feitas com sucesso" });
      } catch(error){
        return ({ message: "Falha ao excluir" });
      }

  }
  
  
  