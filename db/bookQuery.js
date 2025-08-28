const pool = require("./pool");

async function getAllBooks(searchTerm = "") {
  let queryText = "SELECT * FROM books";
  const queryParams = [];

  // Note to self - instead of appending the search term to pool.query we can push
  // search term into an array IF it is looking for an exact book. Makes it
  //cleaner and performs santization as needed.
  if (searchTerm) {
    queryText += "WHERE books ILIKE $1";
    queryParams.push(`%${searchTerm}%`);
  }

  const { rows } = await pool.query(queryText, queryParams);
  return rows;
}

module.exports = {
  getAllBooks,
};
