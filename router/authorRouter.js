const { Router } = require("express");
const authorRouter = Router();
const authorController = require("../controllers/authorController");

authorRouter.get("/", authorController.getAuthors);
authorRouter.get("/:id/edit", authorController.getAuthorEdit);
authorRouter.get("/newauthor", authorController.getAddAuthor);
authorRouter.post("/:id/update", authorController.postUpdateAuthor);
authorRouter.post("/:id/delete", authorController.deleteAuthor);
authorRouter.post("/createauthor", authorController.postAddAuthor);

module.exports = authorRouter;
