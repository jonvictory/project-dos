DROP DATABASE IF EXISTS feature;

CREATE DATABASE feature;
USE feature;

CREATE TABLE user
(
	id int NOT NULL AUTO_INCREMENT,
	email varchar(255) NOT NULL,
	passowrd varchar(255) NOT NULL,
	adminz boolean DEFAULT 0,
	PRIMARY KEY (id)
);

SELECT * FROM user