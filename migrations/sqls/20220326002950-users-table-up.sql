/* Replace with your SQL commands */
CREATE TABLE users (
  id serial PRIMARY KEY, 
  firstName varchar(40)NOT NULL, 
  lastName varchar(60)NOT NULL, 
  password varchar(100)NOT NULL
);