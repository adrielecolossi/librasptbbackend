const db = require("../infra/database");

exports.saveQuestaoDigitarMidia = async function (questao) {
    try{
    const result = await db.query(
      "insert into questao (id) values((SELECT max(id)+1 from questao)) RETURNING id;"
    );
  
    const sql= "insert into digitarmidia(questao, resposta, midia) values ($1, $2, $3)";
    const result2 = await db.query(sql, [result.rows[0].id, questao.resposta, questao.midia]
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

  exports.getQuestaoDigitarMidia= async  function(categoria){
    const sql = "select * from digitarmidia join questao on digitarmidia.questao= questao.id join questaocategoria on questaocategoria.questao= questao.id where categoria= $1;"
    const result = await db.query(sql, [categoria]);
    return result.rows;
  }


exports.putQuestaoDigitarMidia = async function(questao){
 
    if(questao.categoria==[] ||questao.resposta == '' ){
      return ({ message: 'Nenhuma alteração realizada pois as categorias estavam em branco' });
     } else{

        try{
            const sql= "delete from questaocategoria where questao=$1"
            const result  = await db.query(sql, [questao.id])
           
      let sqlInsertQuestaoCategoria = "insert into questaocategoria(questao, categoria) values ($1, $2);"
      let result2;
  
      for (let i = 0; i < questao.categoria.length; i++) {
        result2 = await db.query(sqlInsertQuestaoCategoria, [questao.id ,questao.categoria[i]] 
        );
      }
    
    
    if(questao.resposta!== ''){
      const sqlUpdate= "UPDATE digitarmidia SET resposta = $1  WHERE questao = $2;";
      const result3 = await db.query(sqlUpdate, [questao.resposta, questao.id]);
    }
    if(questao.midia!== ''){
      const sqlUpdate= "UPDATE digitarmidia SET midia = $1  WHERE questao = $2;";
      const result3 = await db.query(sqlUpdate, [questao.midia, questao.id]);
    }
    
    return ({ message: 'Alterações feitas com sucesso' });
} catch(error){
    return ({ message: "Falha ao editar" });
}    
}
}
  
  
    

exports.excluirQuestaoDigitarMidia = async function(questao){
    try{
      const sql= "delete from questaocategoria where questao = $1"
    const result = await db.query(sql, [questao.id]);
    const sql2= "delete from digitarmidia where questao = $1"
    const result2 = await db.query(sql2, [questao.id]);
    const sql3= "delete from questao where id= $1"
    const result3 = await db.query(sql3, [questao.id]);
    return ({ message: "Alterações feitas com sucesso" });
    } catch(error){
      return ({ message: "Falha ao excluir" });
    }

  }