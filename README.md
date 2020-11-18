# Virtual-library
A simple virtual library app, created to help you maintain your home library well organized.

Project uses MySQL for library and users table.

CREATE TABLE library ( isbn int(11) NOT NULL, title varchar(50), author varchar(50), publish_date date, publisher varchar(50), numOfPages int(11), PRIMARY KEY (isbn) );

CREATE TABLE users ( email varchar(100) NOT NULL, password varchar(100) DEFAULT NULL, active tinyint(1) DEFAULT 0, PRIMARY KEY (email) );
