const pool = require("./pool");

async function getAllAuthors(searchTerm = "") {
  let queryText = "SELECT * FROM authors";
  const queryParams = [];

  if (searchTerm) {
    queryText += "WHERE authors ILIKE $1";
    queryParams.push(`%${searchTerm}%`);
  }

  const { rows } = await pool.query(queryText, queryParams);
  return rows;
}

module.exports = {
  getAllAuthors,
};
