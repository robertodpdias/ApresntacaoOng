drop database if exists ong;
create database ong charset=UTF8 collate utf8_general_ci;
use ong;
create table assistidos(
	id integer not null PRIMARY key auto_increment,
	nome varchar(50) not null,
	nascimento Date
);

create table probs(
	id integer not null PRIMARY key auto_increment,
	id_assist integer not null,
	doenca varchar(50) not null,
	CONSTRAINT fk_assist FOREIGN key (id_assist) references assistidos(id) on delete cascade on update cascade
);

insert into assistidos values
(default,"Jacinto Pena","2000-01-03"),
(default,"Jacinto Paixão","2003-07-13"),
(default,"Maria Pena","2001-08-23"),
(default,"Ana Pena","1988-12-03");

insert into probs values
(default,1,"HIV"),
(default,1,"Hypertenção"),
(default,1,"Diabetes"),
(default,1,"Maconha"),
(default,1,"Cocaina"),
(default,1,"Craque"),
(default,2,"Hypertenção"),
(default,2,"Diabetes"),
(default,2,"Maconha"),
(default,3,"Diabetes"),
(default,3,"Alcool");

create view vw_saude as
select a.id,a.nome,a.nascimento,p.id as id_prob,p.doenca
from assistidos a inner join probs p on a.id = p.id_assist;

select * from assistidos;
select * from probs;
select * from vw_saude;

select * from vw_saude where id = 3;
select * from vw_saude where nome like "Maria%";

