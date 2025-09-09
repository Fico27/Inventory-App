const db = require("../db/genreQuery");
const { post } = require("../router/authorRouter");

async function getGenres(req, res) {
  const searchTerm = req.query.search || "";

  try {
    const genres = await db.getAllGenres(searchTerm);

    if (genres.length === 0) {
      return res.render("genre", {
        genres,
        searchTerm,
        message: "No Genres have been added",
      });
    }
    console.log("Genres:", genres);
    res.render("genre", { genres, searchTerm });
  } catch (error) {
    console.error("Error getting genres", error);
    res.status(500).send("Server Error");
  }
}

async function getGenreEdit(req, res) {
  try {
    const genre = await db.getGenreById(req.params.id);

    if (!genre) {
      res.render("editGenre", { message: "Genre does not exist!" });
    }
    res.render("editGenre", { genre });
  } catch (error) {
    console.error("Error getting genre:", error);
    res.status(500).send("Server Error");
  }
}

async function postGenreUpdate(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  try {
    await db.updateGenre(id, {
      name,
    });
    res.redirect("/genre");
  } catch (error) {
    error.console("Error Updating Genre:", error);
    res.render("editGenre", { message: "Error updating genre" });
  }
}

async function deleteGenre(req, res) {
  const { id } = req.params;
  const searchTerm = req.query.search || "";
  const genres = await db.getAllGenres();
  try {
    await db.deleteGenre(id);
    res.redirect("/genre");
  } catch (error) {
    console.error("Error deleting genre:", error);

    res.render("genre", {
      genres,
      searchTerm,
      message: "Error deleting genre",
    });
  }
}

async function getAddGenre(req, res) {
  res.render("newgenre", { message: null, formData: null });
}

async function postAddGenre(req, res) {
  const name = req.body.genre;
  const searchTerm = req.query.search || "";
  const genres = await db.getAllGenres();
  try {
    await db.addGenre(name);
    res.redirect("/genre");
  } catch (error) {
    console.error("Error adding genre:", error);
    res.render("genre", { searchTerm, genres, message: "Error adding genre" });
  }
}

module.exports = {
  getGenres,
  getGenreEdit,
  postGenreUpdate,
  deleteGenre,
  getAddGenre,
  postAddGenre,
};
