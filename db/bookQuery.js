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

module.exports = {
  getAllBooks,
  getBookById,
};
