
CREATE TABLE jogador(
      email VARCHAR(200) NOT NULL PRIMARY KEY, 
      datahoracadastro date NOT NULL DEFAULT current_timestamp check (datahoracadastro <= current_timestamp),
      senha VARCHAR(3000) NOT NULL check(length(senha)>=6),  --e menor igual a 30
      nome VARCHAR(500) NOT NULL,
      genero CHAR(1) NOT NULL check (genero = 'M' or genero = 'F' or genero = 'O'),
      datadenascimento date NOT NULL,
      minigamesjogados VARCHAR(6) DEFAULT 0,  --botando um milhão porque vai que né
      minigamesvencidos VARCHAR(6) DEFAULT 0
);

CREATE TABLE midia(
      id SERIAL NOT NULL PRIMARY KEY,
      url VARCHAR(200) NOT NULL
--	  nome VARCHAR(200) NOT NULL,
--	  tipo VARCHAR(60) NOT NULL,
--	  descricao VARCHAR(200) NOT NULL	
 );

CREATE TABLE questao(
      id SERIAL NOT NULL PRIMARY KEY
);

CREATE TABLE ordenar(
        questao INTEGER NOT NULL,
      frase VARCHAR(300) NOT NULL,
           FOREIGN KEY (questao) REFERENCES questao(id)
);

CREATE TABLE completar(
        questao INTEGER NOT NULL,
      frase VARCHAR(300) NOT NULL,
      opcao1 varchar(70), --é sempre a certa
      opcao2 varchar(70),
      opcao3 varchar(70),
      opcao4 varchar(70),
      opcao5 varchar(70),
         
);


CREATE TABLE marcar(
       questao INTEGER NOT NULL,
       midia varchar(300),
      opcao1 varchar(70), --é a opção correta
      opcao2 varchar(70),
      opcao3 varchar(70),
      opcao4 varchar(70),
      opcao5 varchar(70),
      FOREIGN KEY (questao) REFERENCES questao(id)
);

CREATE TABLE frasecorreta(
       questao INTEGER NOT NULL,
      opcao1 varchar(70), --é a opção correta
      opcao2 varchar(70),
      opcao3 varchar(70),
      opcao4 varchar(70),
      opcao5 varchar(70),
      FOREIGN KEY (questao) REFERENCES questao(id)
);


CREATE TABLE associar(
       questao INTEGER NOT NULL,
      opcao1 varchar(700),
      opcao2 varchar(700),
      opcao3 varchar(700),
      opcao4 varchar(700),
      opcao5 varchar(700),
      opcao6 varchar(700), --são urls
      opcao7 varchar(700),
      opcao8 varchar(700),
	opcao9 varchar(700),
      opcao10 varchar(700),
       FOREIGN KEY (questao) REFERENCES questao(id)
);

CREATE TABLE preencherdigitando(
        questao INTEGER NOT NULL,
      frase VARCHAR(300) NOT NULL,
      resposta varchar(40),
      FOREIGN KEY (questao) REFERENCES questao(id)
) 

CREATE TABLE preencheralternativa(
       questao INTEGER NOT NULL,
      frase VARCHAR(300) NOT NULL,
      opcao1 varchar(70),
      opcao2 varchar(70),
      opcao3 varchar(70),
      opcao4 varchar(70),
      opcao5 varchar(70),
      FOREIGN KEY (questao) REFERENCES questao(id)
) 


CREATE TABLE digitarmidia(
      questao INTEGER NOT NULL,
      resposta varchar(40),
       midia VARCHAR(400),
FOREIGN KEY (questao) REFERENCES questao(id)
);

--CREATE TABLE questaomidiacategoria(
  --    questao INTEGER NOT NULL,
    --  categoria INTEGER NOT NULL,
     -- midia INTEGER NOT NULL,
     -- FOREIGN KEY (questao) REFERENCES questao(id),
      --FOREIGN KEY (categoria) REFERENCES categoria(id),
      --FOREIGN KEY (midia) REFERENCES midia(id),
	--PRIMARY KEY(questao, categoria)
--);

CREATE TABLE questaomidia(
      questao INTEGER NOT NULL,
     midia INTEGER NOT NULL,
     FOREIGN KEY (questao) REFERENCES questao(id),
     FOREIGN KEY (midia) REFERENCES midia(id),
     PRIMARY KEY(questao, midia)
);

CREATE TABLE questaocategoria(
      questao INTEGER NOT NULL,
     categoria INTEGER NOT NULL,
     FOREIGN KEY (questao) REFERENCES questao(id),
     FOREIGN KEY (categoria) REFERENCES categoria(id),
     PRIMARY KEY(questao, categoria)
     
);
/*
CREATE TABLE midiacategoria(
    categoria INTEGER NOT NULL,
   midia INTEGER NOT NULL,
   FOREIGN KEY (categoria) REFERENCES categoria(id),
      FOREIGN KEY (midia) REFERENCES midia(id),
	PRIMARY KEY(categoria, midia)
);
*/
CREATE TABLE usuariobanco(
      nome VARCHAR(200) NOT NULL,
      email VARCHAR(200) NOT NULL PRIMARY KEY,
      senha VARCHAR(300) NOT NULL 
);

--INSERT INTO usuarioBanco(nome, senha) VALUES ('LibrasPTB', '')
CREATE TABLE historico(
      jogador VARCHAR(200) NOT NULL, 
      questao INTEGER NOT NULL,
      datahoraquestao Timestamp without Time Zone DEFAULT current_timestamp   NOT NULL check (datahoraquestao <= current_timestamp),--mostra a data que a questão foi jogada 
      FOREIGN KEY (jogador) REFERENCES jogador(email),
      FOREIGN KEY (questao) REFERENCES questao(id),
      PRIMARY KEY(jogador, questao)
);

CREATE TABLE categoria(
      id SERIAL NOT NULL PRIMARY KEY,
      nome VARCHAR(200) NOT NULL,
      midia VARCHAR(200)
);

insert into usuariobanco(nome, email, senha) values('ADMLibrasPTB','librasptb@gmail.com',  'c542223dfff2fd9cf3df99645fb7bed4')

insert into categoria(id,nome,midia) values (1, 'Alimentos','https://docs.google.com/uc?id=1ndH_wvwuPOyURz5PAvtrOApq0Ip7-qyW')
insert into categoria(id,nome,midia) values (2, 'Profissões','https://docs.google.com/uc?id=1YqAq0Bg_w5sC7rxtaPPf0U6RBcOthSyc')


insert into jogador(email,senha,nome,genero, datadenascimento) values ('adriele.colossi4@gmail.com', 'c542223dfff2fd9cf3df99645fb7bed4', 'Adriele Colossi', 'F', '04/07/2003');