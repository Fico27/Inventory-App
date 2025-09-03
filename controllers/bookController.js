const db = require("../db/bookQuery");

async function getBooks(req, res) {
  const searchTerm = req.query.search || "";

  try {
    const books = await db.getAllBooks(searchTerm);

    if (books.length === 0) {
      return res.render("index", {
        books,
        searchTerm,
        message: "No books found",
      });
    }
    console.log("Books:", books);
    res.render("index", { books, searchTerm });
  } catch (error) {
    console.error("Error getting books:", error);
    res.status(500).send("Server Error");
  }
}

async function getBookEdit(req, res) {
  try {
    const book = await db.getBookById(req.params.id);

    if (!book) {
      return res.render("editBook", { message: "No book to edit!" });
    }
    res.render("editBook", { book });
  } catch (error) {
    console.error("Error getting book for edit:", error);
    res.status(500).send("Server Error");
  }
}

async function postUpdateBook(req, res) {
  const { id } = req.params;
  const { title, isbn, published, quantity, price, description } = req.body;
  try {
    await db.updateBook(id, {
      title,
      isbn,
      published,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      description,
    });
    res.redirect("/");
  } catch (error) {
    console.error("Error updating book:", error);
    const book = await db.getBookById(id);
    res.render("editBook", { book, message: "Error updating book" });
  }
}

module.exports = {
  getBooks,
  getBookEdit,
  postUpdateBook,
};
