const db = require("../db/authorQuery");

async function getAuthors(req, res) {
  const searchTerm = req.query.search || "";

  try {
    const authors = await db.getAllAuthors(searchTerm);
    if (authors.length === 0) {
      return res.render("author", {
        authors,
        searchTerm,
        message: "Author not found",
      });
    }
    console.log("Author:", authors);
    res.render("author", { authors, searchTerm });
  } catch (error) {
    console.error("Error getting authors:", error);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  getAuthors,
};
