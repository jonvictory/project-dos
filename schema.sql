DROP DATABASE IF EXISTS passport_demo;

CREATE DATABASE passport_demo;
USE passport_demo;

CREATE TABLE passport
(
	id int NOT NULL AUTO_INCREMENT,
	email varchar(255) NOT NULL,
	passowrd varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

SELECT * FROM passport