const express = require("express");
const router = express.Router();
const questaoService = require("../service/questaoService.js");
var md5 = require('md5');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const multerConfig = require('./config/multer.js')
let erro = false;

const { isAuth } = require("../middlewares/is-auth");
const fs = require('fs')
const readline = require('readline');
const { google } = require('googleapis');
const KEYFILEPATH = 'ServiceAccountCred.json';
const SCOPES = ["https://www.googleapis.com/auth/drive"];
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES
}
)
const { createAndUploadFile } = require('./upload');
router.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  return res.json(post);
});
router.get("/questao", async function (req, res) {
  const questao = await questaoService.getQuestao();
  res.json(questao);
});
router.get("/questao/:id", async function (req, res) {
  const questao = await questaoService.getQuestaoId(req.params.id);
  return res.json({
    recebido: req.params.id,
    dobro: req.params.id * 2,
    par: req.params.id % 2 == 0,
    questao
  })
});


router.post('/questaoOrdenarFrase', isAuth, async function (req, res) {

  let questao = req.body;

  const newQuestao = await questaoService.saveQuestaoOrdenarFrase(questao);
  return res.json(newQuestao);
}
);


router.get('/getQuestaoOrdenarFrase', isAuth, async function (req, res) {
  categoria = req.query.id
  const questoes = await questaoService.getQuestaoOrdenarFrase(categoria);
  return res.send(questoes);
})


router.put('/editarQuestaoOrdenarFrase', isAuth, async function (req, res) {
  questao = req.body
  const questaoEditada = await questaoService.putQuestaoOrdenarFrase(questao);
  return res.send(questaoEditada);
})
router.delete('/excluirQuestaoOrdenarFrase', isAuth, async function (req, res) {
  questao = req.body
  const questaoEditada = await questaoService.excluirQuestaoOrdenarFrase(questao);
  return res.send(questaoEditada);
})


router.post('/questaoDigitarLacuna', isAuth, async function (req, res) {
  const questao = req.body
  const newQuestao = await questaoService.saveQuestaoDigitarLacuna(questao);
  return res.json(newQuestao);
})
router.get('/getQuestaoDigitarLacuna', isAuth, async function (req, res) {
  categoria = req.query.id
  const questoes = await questaoService.getQuestaoDigitarLacuna(categoria);
  return res.send(questoes);
})

router.put('/editarQuestaoDigitarLacuna', isAuth, async function (req, res) {
  questao = req.body
  const questaoEditada = await questaoService.putQuestaoDigitarLacuna(questao);
  return res.send(questaoEditada);
})

router.delete('/excluirQuestaoDigitarLacuna', isAuth, async function (req, res) {
  questao = req.body
  const questaoEditada = await questaoService.excluirQuestaoDigitarLacuna(questao);
  return res.send(questaoEditada);
})
router.delete('/excluirQuestaoDigitarMidia', isAuth, async function (req, res) {
  questao = req.body
  const questaoEditada = await questaoService.excluirQuestaoDigitarMidia(questao);
  return res.send(questaoEditada);
})


router.post('/questaoFraseCorreta', isAuth, async function (req, res) {
  const tokenRecebido = req.body.token
  let questao = req.body;

  const newQuestao = await questaoService.saveQuestaoFraseCorreta(questao);
  return res.json(newQuestao);
})
router.get('/getQuestaoFraseCorreta', isAuth, async function (req, res) {
  categoria = req.query.id
  const questoes = await questaoService.getQuestaoFraseCorreta(categoria);
  return res.send(questoes);
})
router.post('/questaoAssociarColunas', isAuth, async function (req, res) {
  let questao = req.body

  const newQuestao = await questaoService.saveQuestaoAssociarColunas(questao);
  return res.json(newQuestao);
  // return res.json(newQuestao);

})

router.get('/getQuestaoAssociarColunas', isAuth, async function (req, res) {
  categoria = req.query.id
  const questoes = await questaoService.getQuestaoAssociarColunas(categoria);
  return res.send(questoes);
})



router.put('/editarQuestaoAssociarColunas', isAuth, async function (req, res) {
  questao = req.body
  const questaoEditada = await questaoService.putQuestaoAssociarColunas(questao);

  return res.json(questaoEditada);
})

router.get('/getCategoriasDaQuestao', async function (req, res) {
  questao = req.query.id
  const questoes = await questaoService.getCategoriasdaQuestao(questao);
  return res.send(questoes);
})

router.delete('/excluirQuestaoAssociarColunas', isAuth, async function (req, res) {
  questao = req.body
  const questaoEditada = await questaoService.excluirQuestaoAssociarColunas(questao);
  return res.send(questaoEditada);
})

router.post('/questaoMarcarMidia', isAuth, async function (req, res) {

  let questao = req.body;

  const newQuestao = await questaoService.saveQuestaoMarcarMidia(questao);
  return res.send(newQuestao)
})
router.get('/getQuestaoMarcarMidia', isAuth, async function (req, res) {
  categoria = req.query.id
  const questoes = await questaoService.getQuestaoMarcarMidia(categoria);
  return res.send(questoes);
})
router.put('/editarQuestaoMarcarMidia', isAuth, async function (req, res) {
  questao = req.body
  const questaoEditada = await questaoService.putQuestaoMarcarMidia(questao);
  return res.send(questaoEditada);
})

router.delete('/excluirQuestaoMarcarMidia', isAuth, async function (req, res) {
  questao = req.body
  const questaoEditada = await questaoService.excluirQuestaoMarcarMidia(questao);
  return res.send(questaoEditada);
})


router.post('/questaoMarcarLacuna', isAuth, async function (req, res) {
  let questao = req.body;
  const newQuestao = await questaoService.saveQuestaoMarcarLacuna(questao);
  return res.json(newQuestao);

})

router.get('/getQuestaoMarcarLacuna', isAuth, async function (req, res) {
  categoria = req.query.id
  const questoes = await questaoService.getQuestaoMarcarLacuna(categoria);
  return res.send(questoes);
});


router.put('/editarQuestaoMarcarLacuna', isAuth, async function (req, res) {
  questao = req.body
  const questaoEditada = await questaoService.putQuestaoMarcarLacuna(questao);
  return res.send(questaoEditada);
})
router.delete('/excluirQuestaoMarcarLacuna', isAuth, async function (req, res) {
  questao = req.body
  const questaoEditada = await questaoService.excluirQuestaoMarcarLacuna(questao);
  return res.send(questaoEditada);
})


router.post('/questaoDigitarMidia', isAuth, async function (req, res) {

  let questao = req.body;



  const newQuestao = await questaoService.saveQuestaoDigitarMidia(questao);
  return res.json(newQuestao);

});

router.get('/getQuestaoDigitarMidia', isAuth, async function (req, res) {
  categoria = req.query.id
  const questoes = await questaoService.getQuestaoDigitarMidia(categoria);
  return res.send(questoes);
});

router.put('/editarQuestaoDigitarMidia', isAuth, async function (req, res) {
  questao = req.body
  const questaoEditada = await questaoService.putQuestaoDigitarMidia(questao);
  return res.send(questaoEditada);
})

router.post('/cadastrarUsuario', isAuth, async function (req, res) {
  const email = req.body.email
  const nome = req.body.nome
  const genero = req.body.genero
  const datadenascimento = req.body.data
  const senha = md5(req.body.senha);
  const check = await questaoService.cadastrarUsuario(email, nome, genero, datadenascimento, senha);
  res.json(check)
});
const upload = multer({ dest: 'uploads/' });
// Configuramos o upload como um middleware que espera um arquivo cujo a chave é "foto"
router.post('/checkExistence', async function (req, res) {
  const email = req.body.email
  const check = await questaoService.checkExistence(email);
  res.json(check)
});
router.post('/imagem', multer(multerConfig).single('file'), async function (req, res) {
  if (req.file !== undefined) {
    path.resolve(__dirname, "..", "..", "tmp", "uploads")
    const resp = await createAndUploadFile(req.baseUrl, './rest_api/server/tmp/uploads/' + req.file.filename, auth)
    return res.send(resp);
  } else {
    return res.json({ msg: 'Falha ao colocar imagem' });
  }
})
router.post("/questao", async function (req, res) {
  const tokenRecebido = req.body.token
  let questao = req.body;
  let decodedToken;
  try {
    decodedToken = jwt.verify(tokenRecebido, 'somesupersecretsecret');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (decodedToken) {
    const newQuestao = await questaoService.saveQuestao(questao);
    return res.json({ msg: 'Sucesso ao cadastrar uma questão' });
  } else {
    return res.json({ msg: 'Falha ao cadastrar uma questão. Faça primeiro o login.' });
  }
});
router.post("/login", async function (req, res, next) {
  const email = req.body.email
  const senha = req.body.senha
  const senhaUser = await questaoService.getSenha(email);
  const senhaCriptografada = md5(senha);
  if (senhaUser[0] !== undefined) {
    if (senhaUser == undefined) {
      erro = 'Este email não esta cadastrado no nosso banco de dados';
    }
    if (senhaUser[0].senha == senhaCriptografada) {
      token = jwt.sign(
        {
          email: email
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      req.session.usuario = token;
      return res.status(200).send({ token: token, email: email });
    } else {
      return res.status(400).json({ msg: erro });
    }
  } else {
    return res.status(400).json({ msg: erro })
  }
})

router.get("/login", async function (req, res) {
  const tokenRecebido = req.query.token;
  if(tokenRecebido== undefined){
    return res.json({msg: "notLoggedIn"})
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(tokenRecebido, 'somesupersecretsecret');

    return res.json({ msg: 'loggedIn' })

  } catch (err) {
    err.statusCode = 500;
    return res.json({ msg: 'notLoggedIn' })

  }
})
router.post("/loginApp", async function (req, res, next) {
  const email = req.body.email
  const senha = req.body.senha
  const senhaUser = await questaoService.getSenhaApp(email);
  const senhaCriptografada = md5(senha);
  if (senhaUser == undefined) {
    erro = 'Este email não esta cadastrado no nosso banco de dados';
  }
  if (senhaUser[0] !== undefined) {
    if (senhaUser[0].senha == senhaCriptografada) {
      token = jwt.sign(
        {
          email: email
        },
        'somesupersecretsecret'
      );
      return res.status(200).send({ token: token, email: email });
    } else {
      return res.status(400).json({ msg: "Senha errada" });
    }
  } else {
    return res.status(405).json({ msg: 'Este email não esta cadastrado no nosso banco de dados' })
  }
})
router.post('/categoria', async function (req, res) {
  const categoria = req.body;
  const newCategoria = await questaoService.saveCategoria(categoria)
  res.json(newCategoria);
});

router.put('/editarcategoria', async function (req, res) {
  const categoria = req.body;

  const editedCategoria = await questaoService.editCategoria(categoria)
  res.json(editedCategoria);

});
router.delete('/excluircategoria', async function (req, res) {
  const categoria = req.body;
  //const newCategoria = await questaoService.saveCategoria(categoria)
  ///res.json(newCategoria);
  const deletedCategoria = await questaoService.deleteCategoria(categoria)
  res.json(deletedCategoria);
});
router.get("/categoria", async function (req, res) {
  const categoria = await questaoService.getCategoria();
  res.send(categoria);
});

router.put('/editarQuestaoFraseCorreta', async function (req, res) {
  questao = req.body
  const questaoEditada = await questaoService.putQuestaoFraseCorreta(questao);
  return res.send(questaoEditada);
})
router.delete('/excluirQuestaoFraseCorreta', async function (req, res) {
  questao = req.body
  const questaoEditada = await questaoService.excluirQuestaoFraseCorreta(questao);
  return res.send(questaoEditada);
})




module.exports = router

/*

router.post("/posts", multer(multerConfig).single("file"), async (req, res) => {


  return res.json(post);
});


*/