# Virtual-library
A simple virtual library app, created to help you maintain your home library well organized.

Project uses MySQL for library table.

CREATE TABLE library ( isbn int(11) NOT NULL, title varchar(50), author varchar(50), publish_date date, publisher varchar(50), numOfPages int(11), PRIMARY KEY (isbn) );
