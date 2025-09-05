const pool = require("./pool");

async function getAllBooks(searchTerm = "") {
  let queryText = "SELECT * FROM books";
  const queryParams = [];

  // Note to self - instead of appending the search term to pool.query we can push
  // search term into an array IF it is looking for an exact book. Makes it
  //cleaner and performs santization as needed.
  if (searchTerm) {
    queryText += " WHERE books.title ILIKE $1";
    queryParams.push(`%${searchTerm}%`);
  }

  const { rows } = await pool.query(queryText, queryParams);
  return rows;
}

async function getBookById(id) {
  const queryText = `
  
  SELECT books.*,
                ARRAY_AGG(authors.id) AS author_ids,
                ARRAY_AGG(genres.id) AS genre_ids
  FROM books
  LEFT JOIN book_authors ON books.id = book_authors.book_id
  LEFT JOIN authors ON book_authors.author_id = authors.id
  LEFT JOIN book_genres ON books.id = book_genres.book_id
  LEFT JOIN genres ON book_genres.genre_id = genres.id
  WHERE books.id = $1
  GROUP BY books.id
  
  `;
  const { rows } = await pool.query(queryText, [id]);
  return rows[0];
}

async function updateBook(
  id,
  { title, isbn, published, quantity, price, description }
) {
  /*For me- What do i need to do? I need to connect to db, query to update book. 
Disconnect from db */

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(
      `UPDATE books
  SET title = $1, isbn = $2, published = $3, quantity = $4, price = $5, description = $6
  WHERE id = $7`,
      [title, isbn, published, quantity, price, description, id]
    );

    await client.query("COMMIT");
  } catch (error) {
    //Incase of fail rollback the commit
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function deleteBook(id) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM books WHERE id = $1", [id]);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
