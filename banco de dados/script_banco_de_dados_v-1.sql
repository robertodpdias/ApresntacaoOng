DROP DATABASE IF EXISTS projetoOng;

CREATE DATABASE projetoOng CHARSET=UTF8 COLLATE UTF8_GENERAL_CI;
USE projetoOng;


CREATE TABLE saude(
	id_saude INTEGER PRIMARY KEY AUTO_INCREMENT,
	id_assistido INTEGER,
	problema_de_saude TEXT
);

CREATE TABLE familiar(
	id_familiar INTEGER PRIMARY KEY AUTO_INCREMENT,
	nome_completo VARCHAR(40),
	rg VARCHAR(15),
	parentesco VARCHAR(12),
	telefone VARCHAR(15),
	email VARCHAR(20),
	endereco VARCHAR(40)
);

CREATE TABLE substanciaPsicoativa(
	id_droga INTEGER PRIMARY KEY AUTO_INCREMENT,
	alcool BOOLEAN NOT NULL,
	nicotina BOOLEAN NOT NULL,
	cocaina BOOLEAN NOT NULL,
	crack BOOLEAN NOT NULL,
	maconha BOOLEAN NOT NULL,
	ox BOOLEAN NOT NULL
);



CREATE TABLE assistido(
	id_assistido INTEGER PRIMARY KEY AUTO_INCREMENT,
	id_saude INTEGER,
	id_familiar INTEGER,
	id_droga INTEGER,
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
	foto LONG BLOB,
	foto_depois LONG BLOB,
	relatorio TEXT,
	
	CONSTRAINT fk_saude_01 FOREIGN KEY(id_saude) REFERENCES saude (id_saude) ON DELETE CASCADE,
	CONSTRAINT fk_familiar_01 FOREIGN KEY(id_familiar) REFERENCES familiar (id_familiar) ON DELETE CASCADE,
	CONSTRAINT fk_droga_01 FOREIGN KEY (id_droga) REFERENCES substanciaPsicoativa (id_droga) ON DELETE CASCADE
); 

CREATE TABLE funcionario(
	id_funcionario INTEGER PRIMARY KEY AUTO_INCREMENT,
	foto LONG BLOB,
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


ALTER TABLE assistido ADD CONSTRAINT fk_funcionario02 FOREIGN KEY (id_funcionario) REFERENCES funcionario(id_funcionario);

CREATE TABLE financeiro(
	id_lancamento INTEGER PRIMARY KEY AUTO_INCREMENT,
	id_funcionario INTEGER NOT NULL,
	data_lancamento DATETIME NOT NULL,
	tipo VARCHAR(40) NOT NULL,
	descricao VARCHAR(40) NOT NULL,
	valor DECIMAL(5,2) NOT NULL,
	
	CONSTRAINT fk_funcionario03 FOREIGN KEY (id_funcionario) REFERENCES funcionario(id_funcionario)
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
	
	CONSTRAINT fk_assistido01 		FOREIGN KEY(id_assistido) 		REFERENCES assistido (id_assistido) 	ON DELETE CASCADE,
	CONSTRAINT fk_funcionario01 	FOREIGN KEY(id_funcionario) 	REFERENCES funcionario (id_funcionario) ON DELETE CASCADE,
	CONSTRAINT fk_covid01 			FOREIGN KEY(id_covid) 			REFERENCES covid (id_covid) 			ON DELETE CASCADE,
	CONSTRAINT fk_alimentacao 		FOREIGN KEY(id_alimentacao) 	REFERENCES alimentacao (id_alimentacao) ON DELETE CASCADE
);






