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
name VARCHAR(255) NOT NULL,
bio TEXT,
birth_date DATE
);

CREATE TABLE IF NOT EXISTS genres (

id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS book_authors (

book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
author_id INTEGER NOT NULL REFERENCES authors(id) on DELETE CASCADE,
PRIMARY KEY (book_id, author_id)

);

CREATE TABLE IF NOT EXISTS book_genres (

book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
genre_id INTEGER NOT NULL REFERENCES genres(id) ON DELETE CASCADE,
PRIMARY KEY (book_id, genre_id)

);

INSERT INTO authors (name, bio, birth_date)
      VALUES
        ('Harper Lee', 'American novelist, known for her only novel', '1926-04-28'),
        ('George Orwell', 'British writer of dystopian and political works', '1903-06-25'),
        ('Jane Austen', 'English novelist of romance and social satire', '1775-12-16'),
        ('F. Scott Fitzgerald', 'American novelist of the Jazz Age', '1896-09-24'),
        ('Gabriel García Márquez', 'Colombian Nobel laureate, magical realist', '1927-03-06'),
        ('Herman Melville', 'American writer of adventure and allegory', '1819-08-01'),
        ('J.D. Salinger', 'American author of introspective fiction', '1919-01-01'),
        ('Toni Morrison', 'Nobel Prize-winning American novelist', '1931-02-18'),
        ('James Joyce', 'Irish modernist writer', '1882-02-02'),
        ('Chinua Achebe', 'Nigerian novelist, voice of African literature', '1930-11-16');
    
INSERT INTO genres (name)
      VALUES
        ('Literary Fiction'),
        ('Dystopian'),
        ('Romance'),
        ('Historical Fiction'),
        ('Magical Realism'),
        ('Adventure'),
        ('Coming-of-Age'),
        ('Modernism'),
        ('Postcolonial');

INSERT INTO books (title, isbn, published, quantity, price, description)
      VALUES
        ('To Kill a Mockingbird', '9780446310789', '1960-07-11', 12, 14.99, 'A story of justice in the American South'),
        ('1984', '9780451524935', '1949-06-08', 15, 12.99, 'A dystopian tale of surveillance and control'),
        ('Pride and Prejudice', '9780141439518', '1813-01-28', 10, 11.99, 'A witty romance and social critique'),
        ('The Great Gatsby', '9780743273565', '1925-04-10', 8, 13.50, 'The American Dream in the Jazz Age'),
        ('One Hundred Years of Solitude', '9780060883287', '1967-05-30', 7, 16.99, 'A magical realist family saga'),
        ('Moby-Dick', '9780142437247', '1851-10-18', 5, 15.99, 'An epic quest for the white whale'),
        ('The Catcher in the Rye', '9780316769488', '1951-07-16', 10, 14.50, 'A teenager’s journey through alienation'),
        ('Beloved', '9781400033416', '1987-09-01', 8, 17.50, 'A haunting exploration of slavery’s legacy'),
        ('Ulysses', '9780141182803', '1922-02-02', 4, 18.99, 'A modernist odyssey through Dublin'),
        ('Things Fall Apart', '9780385474542', '1958-01-01', 9, 13.99, 'A Nigerian tale of colonialism and culture');
    
INSERT INTO book_authors (book_id, author_id)
      VALUES
        (1, 1), (2, 2), (3, 3), (4, 4), (5, 5),
        (6, 6), (7, 7), (8, 8), (9, 9), (10, 10);


INSERT INTO book_genres (book_id, genre_id)
      VALUES
        (1, 1), (1, 7),
        (2, 2), (2, 1),
        (3, 3), (3, 4),
        (4, 1), (4, 4),
        (5, 5), (5, 1),
        (6, 6), (6, 1),
        (7, 7), (7, 1),
        (8, 1), (8, 4),
        (9, 8), (9, 1),
        (10, 9), (10, 1);
`;

async function main() {
  console.log("seeding...");
  const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
  const client = new Client({
    connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
