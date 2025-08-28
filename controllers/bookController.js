const db = require("../db/bookQuery");

async function getBooks(req, res) {
  const searchTerm = req.query.search || "";

  try {
    const books = await db.getAllBooks(searchTerm);

    if (books.length === 0) {
      return res.render("index", { books, message: "No books found" });
    }
    console.log("Books:", books);
    res.render("index", { books });
  } catch (error) {
    console.error("Error getting books:", error);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  getBooks,
};
