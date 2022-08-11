const db = require("../infra/database");

exports.saveQuestaoFraseCorreta = async function (questao) {
    try{
    result = await db.query(
      "insert into questao (id) values((SELECT max(id)+1 from questao)) RETURNING id;"
    );
    const sql= "insert into frasecorreta(questao, opcao1, opcao2, opcao3, opcao4, opcao5) values ($1, $2, $3, $4, $5, $6)"
    result3 = await db.query(sql, [
        result.rows[0].id,
        questao.alternativaCerta, questao.alternativaErrada1, questao.alternativaErrada2, questao.alternativaErrada3, questao.alternativaErrada4]
    );
  
    let sqlInsertQuestaoCategoria = "insert into questaocategoria(questao, categoria) values ($1, $2);"
    let result2;

    for (let i = 0; i < questao.categoria.length; i++) {
      result2 = await db.query(sqlInsertQuestaoCategoria, [result.rows[0].id ,questao.categoria[i]] 
      );
    }
    return ({ message: "Questão salva com sucesso" });
} catch(error){
    return ({ message: "Falha ao criar" });
}
  };
  
  exports.getQuestaoFraseCorreta= async function(categoria){
    const sql = "select * from frasecorreta join questao on frasecorreta.questao= questao.id join questaocategoria on questaocategoria.questao= questao.id where categoria= $1;"
    const result = await db.query(sql, [categoria]);

    return result.rows;
  
  }

  
exports.putQuestaoFraseCorreta = async function(questao){  
    if(questao.categoria==[]){
      return ({ message: 'Nenhuma alteração realizada pois as categorias estavam em branco' });
    } else {
        try{
            const sql= "delete from questaocategoria where questao=$1"
            const result  = await db.query(sql, [questao.id])
      
            let result2;
          let sqlInsertQuestaoCategoria = "insert into questaocategoria(questao, categoria) values ($1, $2);"

            for (let i = 0; i < questao.categoria.length; i++) {
              result2 = await db.query(sqlInsertQuestaoCategoria, [questao.id ,questao.categoria[i]] 
              );
              }
    let result3;
    if(questao.opcao1!== ''){
        const sqlUpdate = "UPDATE frasecorreta SET opcao1 = $1 WHERE questao = $2"
        result3 = await db.query(sqlUpdate, [questao.opcao1, questao.id])
     // return ({ message: 'Alterações feitas com sucesso' });
    }
    if(questao.opcao2!== ''){
        const sqlUpdate = "UPDATE frasecorreta SET opcao2 = $1 WHERE questao = $2"
        result3 = await db.query(sqlUpdate, [questao.opcao2, questao.id])
     // return ({ message: 'Alterações feitas com sucesso' });
    }
    if(questao.opcao3!== ''){
        const sqlUpdate = "UPDATE frasecorreta SET opcao3 = $1 WHERE questao = $2"
        result3 = await db.query(sqlUpdate, [questao.opcao3, questao.id])
     // return ({ message: 'Alterações feitas com sucesso' });
    }
    if(questao.opcao4!== ''){
        const sqlUpdate = "UPDATE frasecorreta SET opcao4 = $1 WHERE questao = $2"
        result3 = await db.query(sqlUpdate, [questao.opcao4, questao.id])
    }
    if(questao.opcao5!== ''){
        const sqlUpdate = "UPDATE frasecorreta SET opcao5 = $1 WHERE questao = $2"
        result3 = await db.query(sqlUpdate, [questao.opcao5, questao.id])
    }
  
    return ({ message: "Alterações feitas com sucesso" });
} catch(error){
  return ({ message: "Falha ao editar" });
}

    }
    
    }

    exports.excluirQuestaoFraseCorreta= async function(questao){
  
        try{
            const sql= "delete from questaocategoria where questao = $1"
          const result = await db.query(sql, [questao.id]);
          const sql2= "delete from frasecorreta where questao = $1"
          const result2 = await db.query(sql2, [questao.id]);
          const sql3= "delete from questao where id= $1"
          const result3 = await db.query(sql3, [questao.id]);
          return ({ message: "Alterações feitas com sucesso" });
          } catch(error){
            return ({ message: "Falha ao excluir" });
          }
      }
      