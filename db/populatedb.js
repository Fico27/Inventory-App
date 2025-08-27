const { Client } = require("pg");
require("dotenv").config();

const SQL = `

CREATE TABLE IF NOT EXISTS books (

id SERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
isbn VARCHAR(255) UNIQUE,
published DATE,
quantity INTEGER NOT NULL DEFAULT 0,
price NUMERIC(10,2),
description TEXT

);

CREATE TABLE IF NOT EXISTS authors (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS genre (

id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS book_authors (

book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
author_id INTEGER NOT NULL REFERENCES author(id) on DELETE CASCADE,
PRIMARY KEY (book_id, author_id)

);

CREATE TABLE IF NOT EXISTS book_genres (

book_id INTERGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
genere_id INTEGER NOT NULL REFERENCES genre(id) ON DELETE CASCADE,
PRIMARY KEY (book_id, genre_id)

);

`;

async function main() {
  console.log("seeding...");
  const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
  const client = new Client({
    connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end("done");
}

main();
