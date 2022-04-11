

USE projetoong;

INSERT INTO funcionario (matricula,nome_completo,rg,cpf,data_nascimento,cargo,sexo,data_admissao,email,senha,status) values
("001", "Mariana Lopes", "33.555.444-3", "444.555.666.33", "05/04/1995", "Assistente Social", "Feminino", "01/06/2018", "marilopes@live.com", "12345678", false);

INSERT INTO funcionario (matricula,nome_completo,rg,cpf,data_nascimento,cargo,sexo,data_admissao,email,senha,status) values
("002", "Pedro Henrique", "22.444.444-5", "888.333.333.33", "04/04/1993", "Assistente Social", "Masculino", "01/04/2018", "pedroh@live.com", "12345678", true);

INSERT INTO funcionario (matricula,nome_completo,rg,cpf,data_nascimento,cargo,sexo,data_admissao,email,senha,status) values
("003", "Ana Clara", "12.222.444-5", "154.333.654.32", "1993-03-09", "Assistente Social", "Masculino", "2018-06-12", "anaclara@live.com", "12345678", true)



INSERT INTO assistido (id_funcionario, nome_completo, rg, cpf, data_nascimento, estado_civil,
naturalidade, sexo) values
(1, "André Lima Santos", "22.565.314-5", "141.545.656-22", "1970-02-03", "Solteiro", "Belo Horizonte-BH", "Masculino");