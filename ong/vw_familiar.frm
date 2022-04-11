TYPE=VIEW
query=select `a`.`id_assistido` AS `id_assistido`,`a`.`id_funcionario` AS `id_funcionario`,`a`.`nome_completo` AS `nome_completo`,`a`.`nome_social` AS `nome_social`,`a`.`rg` AS `rg`,`a`.`cpf` AS `cpf`,`a`.`antecedente_criminal` AS `antecedente_criminal`,`a`.`data_nascimento` AS `data_nascimento`,`a`.`estado_civil` AS `estado_civil`,`a`.`naturalidade` AS `naturalidade`,`a`.`sexo` AS `sexo`,`a`.`cartao_cidadao` AS `cartao_cidadao`,`a`.`cartao_sus` AS `cartao_sus`,`a`.`foto_antes` AS `foto_antes`,`a`.`foto_depois` AS `foto_depois`,`a`.`data_cadastro` AS `data_cadastro_assistido`,`fa`.`data_cadastro` AS `data_cadastro`,`f`.`nome_completo` AS `nome_familiar`,`f`.`rg` AS `rg_familiar`,`fa`.`parentesco` AS `parentesco`,`f`.`telefone` AS `telefone`,`f`.`email` AS `email`,`f`.`endereco` AS `endereco` from ((`ong`.`assistidos` `a` join `ong`.`familiarassistido` `fa` on(`a`.`id_assistido` = `fa`.`id_assistido`)) join `ong`.`familiares` `f` on(`fa`.`id_familiar` = `f`.`id_familiar`))
md5=3dffac0dab9cd8991cfda88ca0798b52
updatable=1
algorithm=0
definer_user=root
definer_host=localhost
suid=2
with_check_option=0
timestamp=2022-03-22 17:59:43
create-version=2
source=select a.id_assistido, a.id_funcionario, a.nome_completo, a.nome_social, a.rg, a.cpf, a.antecedente_criminal, a.data_nascimento, a.estado_civil, a.naturalidade,\na.sexo, a.cartao_cidadao, a.cartao_sus, a.foto_antes, a.foto_depois, a.data_cadastro AS data_cadastro_assistido, fa.data_cadastro, f.nome_completo AS nome_familiar,f.rg AS rg_familiar, fa.parentesco, f.telefone, f.email, f.endereco\nfrom assistidos a inner join familiarassistido fa on a.id_assistido = fa.id_assistido\ninner join familiares f on fa.id_familiar = f.id_familiar
client_cs_name=utf8mb4
connection_cl_name=utf8mb4_general_ci
view_body_utf8=select `a`.`id_assistido` AS `id_assistido`,`a`.`id_funcionario` AS `id_funcionario`,`a`.`nome_completo` AS `nome_completo`,`a`.`nome_social` AS `nome_social`,`a`.`rg` AS `rg`,`a`.`cpf` AS `cpf`,`a`.`antecedente_criminal` AS `antecedente_criminal`,`a`.`data_nascimento` AS `data_nascimento`,`a`.`estado_civil` AS `estado_civil`,`a`.`naturalidade` AS `naturalidade`,`a`.`sexo` AS `sexo`,`a`.`cartao_cidadao` AS `cartao_cidadao`,`a`.`cartao_sus` AS `cartao_sus`,`a`.`foto_antes` AS `foto_antes`,`a`.`foto_depois` AS `foto_depois`,`a`.`data_cadastro` AS `data_cadastro_assistido`,`fa`.`data_cadastro` AS `data_cadastro`,`f`.`nome_completo` AS `nome_familiar`,`f`.`rg` AS `rg_familiar`,`fa`.`parentesco` AS `parentesco`,`f`.`telefone` AS `telefone`,`f`.`email` AS `email`,`f`.`endereco` AS `endereco` from ((`ong`.`assistidos` `a` join `ong`.`familiarassistido` `fa` on(`a`.`id_assistido` = `fa`.`id_assistido`)) join `ong`.`familiares` `f` on(`fa`.`id_familiar` = `f`.`id_familiar`))
mariadb-version=100420
