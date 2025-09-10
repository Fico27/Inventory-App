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

async function getAuthorEdit(req, res) {
  try {
    const author = await db.getAuthorById(req.params.id);

    if (!author) {
      return res.render("editAuthor", { message: "No Author to edit" });
    }
    return res.render("editAuthor", { author });
  } catch (error) {
    console.error("Error getting author:", error);
    res.status(500).send("Server Error");
  }
}

async function postUpdateAuthor(req, res) {
  const { id } = req.params;
  const { name, bio, birth_date } = req.body;

  try {
    await db.updateAuthor(id, {
      name,
      bio,
      birth_date,
    });
    res.redirect("/author");
  } catch (error) {
    console.error("Error updating author:", error);

    res.render("editAuthor", { message: "Error updating author" });
  }
}

async function deleteAuthor(req, res) {
  const { id } = req.params;
  const searchTerm = req.query.search || "";
  try {
    await db.deleteAuthor(id);
    res.redirect("/author");
  } catch (error) {
    console.error("Error deleting author:", error);
    const authors = await db.getAllAuthors();
    res.render("author", {
      authors,
      searchTerm,
      message: "Error deleting author",
    });
  }
}

async function getAddAuthor(req, res) {
  res.render("newauthor", { message: null, formData: null });
}

async function postAddAuthor(req, res) {
  const { name, bio, birthday } = req.body;
  const searchTerm = req.query.search || "";
  const authors = await db.getAllAuthors();

  try {
    await db.addAuthor({ name, bio, birthday });
    res.redirect("/author");
  } catch (error) {
    console.error("Error adding author:", error);
    res.render("author", {
      searchTerm,
      authors,
      message: "Error adding author",
    });
  }
}

module.exports = {
  getAuthors,
  getAuthorEdit,
  postUpdateAuthor,
  deleteAuthor,
  getAddAuthor,
  postAddAuthor,
};
