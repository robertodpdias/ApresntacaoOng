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
	doenca varchar(50) not null
);

create table saude(
	id_assist integer not null,
	id_probs integer not null,
	CONSTRAINT fk_assist FOREIGN key (id_assist) references assistidos(id) on delete cascade on update cascade,
	CONSTRAINT fk_prob FOREIGN key (id_probs) references probs(id) on delete cascade on update cascade
);

insert into assistidos values
(default,"Jacinto Pena","2000-01-03"),
(default,"Jacinto Paixão","2003-07-13"),
(default,"Maria Pena","2001-08-23"),
(default,"Ana Pena","1988-12-03");

insert into probs values
(default,"HIV"),
(default,"Hypertenção"),
(default,"Diabetes"),
(default,"Maconha"),
(default,"Cocaina"),
(default,"Craque"),
(default,"Alcool");

insert into saude values
(1,1),
(1,2),
(1,3),
(1,4),
(1,5),
(1,6),
(2,2),
(2,3),
(2,4),
(3,2),
(3,7);

create view vw_saude as
select a.id as id_assit,a.nome,a.nascimento,p.id as id_prob,p.doenca
from assistidos a inner join saude s on a.id = s.id_assist
inner join probs p on s.id_probs = p.id;

select *
from assistidos a inner join saude s on a.id = s.id_assist
inner join probs p on s.id_probs = p.id;

select * from assistidos;
select * from probs;
select * from saude;
select * from vw_saude;
show tables;

select * from vw_saude where id_assit = 1;
select * from vw_saude where nome like "Maria%";




