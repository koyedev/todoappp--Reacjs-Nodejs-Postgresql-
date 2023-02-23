CREATE DATABASE todoapp

CREATE TABLE todos (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    postgress INT,
    date VARCHAR(300)
);

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);


INSERT INTO todos(id,user_email,title,postgress,date) VaLUES(0, 'koyedev@gmail.com', 'First-todo', '10','THU DEC 29 2022 13:25:45 GMT+0400 (Gulf Standard Time)');