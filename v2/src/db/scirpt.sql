/*
* ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin';
* FLUSH PRIVILEGES;
*/

DROP DATABASE IF EXISTS cinema;
CREATE DATABASE cinema;
USE cinema;

CREATE TABLE movies(
	id int primary key not null auto_increment,
    name varchar(50) not null,
    director varchar(50) not null,
    release_date date
);

INSERT INTO movies(name, director, release_date) values('Toy Story', 'Josh Cooley', '1995/05/07');
INSERT INTO movies(name, director, release_date) values('Sonic The Hedgehog', 'Jeff Fowler', '2020/02/14');
INSERT INTO movies(name, director, release_date) values('Avengers: End Game', 'Joe Russo', '2019/04/26');