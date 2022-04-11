TYPE=VIEW
query=select `a`.`id_assistido` AS `id_assistido`,`a`.`nome_completo` AS `nome_completo`,`a`.`nome_social` AS `nome_social`,`s`.`data_de_registro` AS `data_de_registro`,`c`.`comorbidade` AS `comorbidade`,`c`.`tipo` AS `tipo`,`s`.`id_saude` AS `id_saude` from ((`ong`.`assistidos` `a` join `ong`.`saude` `s` on(`a`.`id_assistido` = `s`.`id_assistido`)) join `ong`.`comorbidades` `c` on(`s`.`id_comorbidade` = `c`.`id_comorbidade`))
md5=0eccb097e07bf93da32e3c91b86b4c4d
updatable=1
algorithm=0
definer_user=root
definer_host=localhost
suid=2
with_check_option=0
timestamp=2022-03-22 17:59:43
create-version=2
source=select a.id_assistido, a.nome_completo, a.nome_social, s.data_de_registro, c.comorbidade, c.tipo, s.id_saude\nfrom assistidos a inner join saude s on a.id_assistido = s.id_assistido\ninner join comorbidades c on s.id_comorbidade = c.id_comorbidade
client_cs_name=utf8mb4
connection_cl_name=utf8mb4_general_ci
view_body_utf8=select `a`.`id_assistido` AS `id_assistido`,`a`.`nome_completo` AS `nome_completo`,`a`.`nome_social` AS `nome_social`,`s`.`data_de_registro` AS `data_de_registro`,`c`.`comorbidade` AS `comorbidade`,`c`.`tipo` AS `tipo`,`s`.`id_saude` AS `id_saude` from ((`ong`.`assistidos` `a` join `ong`.`saude` `s` on(`a`.`id_assistido` = `s`.`id_assistido`)) join `ong`.`comorbidades` `c` on(`s`.`id_comorbidade` = `c`.`id_comorbidade`))
mariadb-version=100420
