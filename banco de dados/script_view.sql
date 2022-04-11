CREATE VIEW vw_saude AS
SELECT
	a.id_assistido AS id_assit,
	a.nome_completo,
	a.data_nascimento,
	c.id_comorbidade AS id_comorb,
	c.comorbidade
FROM
	assistidos a
	INNER JOIN saude s ON a.id_assistido = s.id_assistido
	INNER JOIN comorbidades c ON s.id_probs = p.id;

select
	*
from
	assistidos a
	inner join saude s on a.id_assistido = s.id_assistido
	inner join comorbidades c on s.id_comorbidade = c.id_comorbidade
WHERE
	a.id_assistido = 1;

select
	a.id_assistido,
	a.id_funcionario,
	a.nome_completo,
	a.nome_social,
	a.rg,
	a.cpf,
	a.antecedente_criminal,
	a.data_nascimento,
	a.estado_civil,
	a.naturalidade,
	a.sexo,
	a.cartao_cidadao,
	a.cartao_sus,
	a.foto_antes,
	a.foto_depois,
	a.data_cadastro,
	s.data_de_registro,
	c.comorbidade,
	c.tipo
from
	assistidos a
	inner join saude s on a.id_assistido = s.id_assistido
	inner join comorbidades c on s.id_comorbidade = c.id_comorbidade
WHERE
	a.id_assistido = 1;

CREATE VIEW vw_saude AS
select
	a.id_assistido,
	a.id_funcionario,
	a.nome_completo,
	a.nome_social,
	a.rg,
	a.cpf,
	a.antecedente_criminal,
	a.data_nascimento,
	a.estado_civil,
	a.naturalidade,
	a.sexo,
	a.cartao_cidadao,
	a.cartao_sus,
	a.foto_antes,
	a.foto_depois,
	a.data_cadastro,
	s.id_saude,
	s.data_de_registro,
	c.comorbidade,
	c.tipo
from
	assistidos a
	inner join saude s on a.id_assistido = s.id_assistido
	inner join comorbidades c on s.id_comorbidade = c.id_comorbidade;

CREATE VIEW vw_saude02 AS
select
	a.id_assistido,
	a.nome_completo,
	a.nome_social,
	s.data_de_registro,
	c.comorbidade,
	c.tipo,
	s.id_saude
from
	assistidos a
	inner join saude s on a.id_assistido = s.id_assistido
	inner join comorbidades c on s.id_comorbidade = c.id_comorbidade;

CREATE VIEW vw_familiar AS
select
	a.id_assistido,
	a.id_funcionario,
	a.nome_completo,
	a.nome_social,
	a.rg,
	a.cpf,
	a.antecedente_criminal,
	a.data_nascimento,
	a.estado_civil,
	a.naturalidade,
	a.sexo,
	a.cartao_cidadao,
	a.cartao_sus,
	a.foto_antes,
	a.foto_depois,
	a.data_cadastro AS data_cadastro_assistido,
	fa.data_cadastro,
	f.nome_completo AS nome_familiar,
	f.rg AS rg_familiar,
	fa.parentesco,
	f.telefone,
	f.email,
	f.endereco
from
	assistidos a
	inner join familiarassistido fa on a.id_assistido = fa.id_assistido
	inner join familiares f on fa.id_familiar = f.id_familiar;

CREATE VIEW vw_familiar02 AS
select
	a.id_assistido,
	a.nome_completo AS nome_assistido,
	a.nome_social AS nome_social_assistido,
	a.rg AS rg_assistido,
	a.cpf AS cpf_assistido,
	a.antecedente_criminal AS antecedente_criminal_assistido,
	a.cartao_cidadao AS cartao_cidadao_assistido,
	a.cartao_sus AS cartao_sus_assistido,
	a.foto_depois AS foto_depois_assistido,
	f.id_familiar,
	f.nome_completo AS nome_familiar,
	f.rg AS rg_familiar,
	fa.parentesco,
	f.telefone AS telefone_familiar,
	f.email AS email_familiar,
	f.endereco AS endereco_familiar
from
	assistidos a
	inner join familiarassistido fa on a.id_assistido = fa.id_assistido
	inner join familiares f on fa.id_familiar = f.id_familiar;

SELECT
	*
FROM
	vw_saude
WHERE
	id_assistido = 1;

DELIMITER / / CREATE TRIGGER tr_familiar BEFORE
INSERT
	ON familiarassistido FOR EACH ROW BEGIN IF(
		NEW.id_assistido = familiarassistido.id_assistido
		AND NEW.id_familiar = familiarassistido.id_familiar
	) THEN
SET
	NEW.id_assistido = null;

SET
	NEW.id_familiar = null;

END IF;

END;

/ /
alter table
	familiarassistido
add
	unique index (id_assistido, id_familiar);

ALTER TABLE
	familiares
ADD
	UNIQUE (email);

ALTER TABLE
	tablename AUTO_INCREMENT = 1;
	
	
DELIMITER //
	
CREATE TRIGGER tr_status BEFORE UPDATE ON FUNCIONARIOS

BEGIN
FOR EACH ROW 
IF funcionarios.status = 0 THEN 

	SET funcionarios.data_demissao = OLD funcionarios.data_demissao
	
END IF



END;

DELIMITER //





select 
	f.nome_completo as nome_completo_funcionario, 
	f.foto, 
	f.cpf, 
	f.email,
	assis.nome_completo as nome_assistido_completo,
	ast.id_assistencia,
	ast.id_assistido,
	ast.data_registro,
	sol.id_solicitacao,
	it.item
from funcionarios f inner join assistencias ast on f.id_funcionario = ast.id_funcionario
inner join solicitacao sol on ast.id_assistencia = sol.id_assistencia
inner join assistidos assis on ast.id_assistido = assis.id_assistido
inner join itens it on sol.id_item = it.id_item;

















