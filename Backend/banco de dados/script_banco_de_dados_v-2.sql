DROP DATABASE IF EXISTS ong;

CREATE DATABASE ong CHARSET=UTF8 COLLATE UTF8_GENERAL_CI;
USE ong;


CREATE TABLE assistidos(
	id_assistido INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_funcionario INTEGER NOT NULL,
	nome_completo VARCHAR(40) NOT NULL,
	nome_social VARCHAR(20),
	rg VARCHAR(15),
	cpf VARCHAR(15) UNIQUE,
	data_nascimento DATETIME NOT NULL,
	estado_civil VARCHAR(15) NOT NULL,
	naturalidade VARCHAR(20),
	sexo VARCHAR(12) NOT NULL,
	cartao_cidadao VARCHAR(10),
	cartao_sus VARCHAR(20),
	foto LONGBLOB,
	foto_depois LONGBLOB,
	relatorio TEXT
); 


CREATE TABLE comorbidades(
	id_comorbidade INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	comorbidade varchar(50) NOT NULL
);


CREATE TABLE saude(
	id_saude INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_assistido INTEGER NOT NULL,
	id_comorbidade INTEGER NOT NULL,
	data_de_registro DATETIME,
	
	CONSTRAINT fk_assistido FOREIGN KEY (id_assistido) REFERENCES assistidos(id_assistido) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_comorbidade FOREIGN KEY (id_comorbidade) REFERENCES comorbidades(id_comorbidade) ON DELETE CASCADE ON UPDATE CASCADE 
);






INSERT INTO comorbidades VALUES
(DEFAULT,"HIV"),
(DEFAULT,"Hypertenção"),
(DEFAULT,"Diabetes"),
(DEFAULT,"Depressão"),
(DEFAULT,"Maconha"),
(DEFAULT,"Cocaina"),
(DEFAULT,"Crack"),
(DEFAULT,"OX"),
(DEFAULT,"Alcool");


CREATE TABLE familiares(
	id_familiar INTEGER PRIMARY KEY AUTO_INCREMENT,
	nome_completo VARCHAR(40),
	rg VARCHAR(15),
	parentesco VARCHAR(12),
	telefone VARCHAR(15),
	email VARCHAR(20),
	endereco VARCHAR(40)
);

CREATE TABLE funcionarios(
	id_funcionario INTEGER PRIMARY KEY AUTO_INCREMENT,
	foto LONGBLOB,
	matricula VARCHAR(10) NOT NULL UNIQUE,
	nome_completo VARCHAR(40) NOT NULL,
	rg VARCHAR(15) NOT NULL,
	cpf VARCHAR(15) NOT NULL UNIQUE UNIQUE,
	data_nascimento DATETIME NOT NULL,
	cargo VARCHAR(50) NOT NULL,
	sexo VARCHAR(12) NOT NULL,
	data_admissao DATETIME NOT NULL,
	data_demissao DATETIME,
	email VARCHAR(30) NOT NULL UNIQUE,
	senha VARCHAR(50) NOT NULL,
	status BOOLEAN NOT NULL
);


ALTER TABLE assistidos ADD CONSTRAINT fk_funcionario02 FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id_funcionario);

CREATE TABLE financeiro(
	id_lancamento INTEGER PRIMARY KEY AUTO_INCREMENT,
	id_funcionario INTEGER NOT NULL,
	data_lancamento DATETIME NOT NULL,
	tipo VARCHAR(40) NOT NULL,
	descricao VARCHAR(40) NOT NULL,
	valor DECIMAL(5,2) NOT NULL,
	
	CONSTRAINT fk_funcionario03 FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id_funcionario)
);

CREATE TABLE covid(
	id_covid INTEGER PRIMARY KEY AUTO_INCREMENT,
	temperatura VARCHAR(10) NOT NULL,
	mascara BOOLEAN NOT NULL,
	tosse BOOLEAN NOT NULL,
	cansaco BOOLEAN NOT NULL
);

CREATE TABLE alimentacao(
	id_alimentacao INTEGER PRIMARY KEY AUTO_INCREMENT,
	cafe_da_manha BOOLEAN NOT NULL,
	almoco BOOLEAN NOT NULL,
	cafe_da_tarde BOOLEAN NOT NULL,
	ceia BOOLEAN NOT NULL
);

CREATE TABLE registrarAssistencia(
	id_assistencia INTEGER PRIMARY KEY AUTO_INCREMENT,
	id_assistido INTEGER NOT NULL,
	id_funcionario INTEGER NOT NULL,
	id_covid INTEGER NOT NULL,
	id_alimentacao INTEGER,
	data_de_registro DATETIME NOT NULL,
	roupas BOOLEAN NOT NULL,
	sapatos BOOLEAN NOT NULL,
	kit_higiene BOOLEAN NOT NULL,
	banho BOOLEAN NOT NULL,
	pernoite BOOLEAN NOT NULL,
	abrigo BOOLEAN NOT NULL,
	passagem BOOLEAN NOT NULL,
	cesta_basica BOOLEAN NOT NULL,
	outros VARCHAR(50) NOT NULL,
	
	CONSTRAINT fk_assistido01 		FOREIGN KEY(id_assistido) 		REFERENCES assistidos (id_assistido) 	ON DELETE CASCADE,
	CONSTRAINT fk_funcionario01 	FOREIGN KEY(id_funcionario) 	REFERENCES funcionarios (id_funcionario) ON DELETE CASCADE,
	CONSTRAINT fk_covid01 			FOREIGN KEY(id_covid) 			REFERENCES covid (id_covid) 			ON DELETE CASCADE,
	CONSTRAINT fk_alimentacao 		FOREIGN KEY(id_alimentacao) 	REFERENCES alimentacao (id_alimentacao) ON DELETE CASCADE
);






