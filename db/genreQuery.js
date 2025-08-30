const { getAllAuthors } = require("./authorQuery");
const pool = require("./pool");

async function getAllGenres(searchTerm = "") {
  let queryText = "SELECT * FROM genres";
  const queryParams = [];

  if (searchTerm) {
    queryText += " WHERE genres.name ILIKE $1";
    queryParams.push(`%${searchTerm}%`);
  }

  const { rows } = await pool.query(queryText, queryParams);
  return rows;
}

module.exports = {
  getAllGenres,
};
