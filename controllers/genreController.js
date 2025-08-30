const db = require("../db/genreQuery");

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

module.exports = {
  getGenres,
};
