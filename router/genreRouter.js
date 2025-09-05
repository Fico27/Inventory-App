const { Router } = require("express");
const genreRouter = Router();
const genreController = require("../controllers/genreController");

genreRouter.get("/", genreController.getGenres);
genreRouter.get("/:id/edit", genreController.getGenreEdit);
genreRouter.post("/:id/update", genreController.postGenreUpdate);
genreRouter.post("/:id/delete", genreController.deleteGenre);

module.exports = genreRouter;
