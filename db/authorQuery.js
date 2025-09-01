const pool = require("./pool");

async function getAllAuthors(searchTerm = "") {
  let queryText = "SELECT * FROM authors";
  const queryParams = [];

  if (searchTerm) {
    queryText += " WHERE authors.name ILIKE $1";
    queryParams.push(`%${searchTerm}%`);
  }

  const { rows } = await pool.query(queryText, queryParams);
  return rows;
}

async function getAuthorById(id) {
  const queryText = `
  
  SELECT authors.* FROM authors
  WHERE authors.id = $1
  
  `;
  const { rows } = await pool.query(queryText, [id]);
  return rows[0];
}

async function updateAuthor(id, { name, bio, birth_date }) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `
    UPDATE authors
    SET name = $1, bio = $2, birth_date= $3
    WHERE id = $4`,
      [name, bio, birth_date, id]
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
  getAllAuthors,
  getAuthorById,
  updateAuthor,
};
