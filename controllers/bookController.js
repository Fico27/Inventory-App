const db = require("../db/bookQuery");
const { param } = require("../router/authorRouter");

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
    return res.render("index", { books, searchTerm });
  } catch (error) {
    console.error("Error getting books:", error);
    return res.status(500).send("Server Error");
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
    return res.status(500).send("Server Error");
  }
}

async function postUpdateBook(req, res) {
  const book = await db.getBookById(id);
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
    return res.redirect("/");
  } catch (error) {
    console.error("Error updating book:", error);
    return res.render("editBook", { book, message: "Error updating book" });
  }
}

async function deleteBook(req, res) {
  const books = await db.getAllBooks();
  const { id } = req.params;
  const searchTerm = req.query.search || "";
  try {
    await db.deleteBook(id);
    return res.redirect("/");
  } catch (error) {
    console.error("Error deleting book:", error);

    return res.render("index", {
      books,
      searchTerm,
      message: "Error deleting book",
    });
  }
}

async function getAddBook(req, res) {
  return res.render("newbook", { message: null, formData: null });
}

async function postAddBook(req, res) {
  const { title, isbn, published, quantity, price, description } = req.body;
  const searchTerm = req.query.search || "";
  const books = await db.getAllBooks();
  try {
    await db.addBook({ title, isbn, published, quantity, price, description });
    return res.redirect("/");
  } catch (error) {
    console.error("Error adding book:", error);
    return res.render("index", {
      searchTerm,
      books,
      message: "Error adding book",
    });
  }
}

module.exports = {
  getBooks,
  getBookEdit,
  postUpdateBook,
  deleteBook,
  getAddBook,
  postAddBook,
};
