TYPE=VIEW
query=select `a`.`id_assistido` AS `id_assistido`,`a`.`nome_completo` AS `nome_assistido`,`a`.`nome_social` AS `nome_social_assistido`,`a`.`rg` AS `rg_assistido`,`a`.`cpf` AS `cpf_assistido`,`a`.`antecedente_criminal` AS `antecedente_criminal_assistido`,`a`.`cartao_cidadao` AS `cartao_cidadao_assistido`,`a`.`cartao_sus` AS `cartao_sus_assistido`,`a`.`foto_depois` AS `foto_depois_assistido`,`f`.`id_familiar` AS `id_familiar`,`f`.`nome_completo` AS `nome_familiar`,`f`.`rg` AS `rg_familiar`,`fa`.`parentesco` AS `parentesco`,`f`.`telefone` AS `telefone_familiar`,`f`.`email` AS `email_familiar`,`f`.`endereco` AS `endereco_familiar` from ((`ong`.`assistidos` `a` join `ong`.`familiarassistido` `fa` on(`a`.`id_assistido` = `fa`.`id_assistido`)) join `ong`.`familiares` `f` on(`fa`.`id_familiar` = `f`.`id_familiar`))
md5=ef7e37e3af8a3ab2aba896239191657f
updatable=1
algorithm=0
definer_user=root
definer_host=localhost
suid=2
with_check_option=0
timestamp=2022-03-30 17:37:00
create-version=2
source=select\na.id_assistido,\na.nome_completo AS nome_assistido,\na.nome_social AS nome_social_assistido,\na.rg AS rg_assistido,\na.cpf AS cpf_assistido,\na.antecedente_criminal AS antecedente_criminal_assistido,\na.cartao_cidadao AS cartao_cidadao_assistido,\na.cartao_sus AS cartao_sus_assistido,\na.foto_depois AS foto_depois_assistido,\nf.id_familiar,\nf.nome_completo AS nome_familiar,\nf.rg AS rg_familiar,\nfa.parentesco,\nf.telefone AS telefone_familiar,\nf.email AS email_familiar,\nf.endereco AS endereco_familiar\nfrom\nassistidos a\ninner join familiarassistido fa on a.id_assistido = fa.id_assistido\ninner join familiares f on fa.id_familiar = f.id_familiar
client_cs_name=utf8mb4
connection_cl_name=utf8mb4_general_ci
view_body_utf8=select `a`.`id_assistido` AS `id_assistido`,`a`.`nome_completo` AS `nome_assistido`,`a`.`nome_social` AS `nome_social_assistido`,`a`.`rg` AS `rg_assistido`,`a`.`cpf` AS `cpf_assistido`,`a`.`antecedente_criminal` AS `antecedente_criminal_assistido`,`a`.`cartao_cidadao` AS `cartao_cidadao_assistido`,`a`.`cartao_sus` AS `cartao_sus_assistido`,`a`.`foto_depois` AS `foto_depois_assistido`,`f`.`id_familiar` AS `id_familiar`,`f`.`nome_completo` AS `nome_familiar`,`f`.`rg` AS `rg_familiar`,`fa`.`parentesco` AS `parentesco`,`f`.`telefone` AS `telefone_familiar`,`f`.`email` AS `email_familiar`,`f`.`endereco` AS `endereco_familiar` from ((`ong`.`assistidos` `a` join `ong`.`familiarassistido` `fa` on(`a`.`id_assistido` = `fa`.`id_assistido`)) join `ong`.`familiares` `f` on(`fa`.`id_familiar` = `f`.`id_familiar`))
mariadb-version=100420
