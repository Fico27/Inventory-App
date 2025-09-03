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

async function getGenreById(id) {
  let queryText = `
    SELECT genres.name FROM genres
    WHERE genres.id = $1

      `;
  const { rows } = await pool.query(queryText, [id]);
  return rows[0];
}

async function updateGenre(id, { name }) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query(
      `
      
      UPDATE genres
      SET name = $1
      WHERE id = $2
      
      `,
      [name, id]
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  getAllGenres,
  getGenreById,
  updateGenre,
};
