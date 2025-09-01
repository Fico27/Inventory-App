const { Router } = require("express");
const authorRouter = Router();
const authorController = require("../controllers/authorController");

authorRouter.get("/", authorController.getAuthors);
authorRouter.get("/:id/edit", authorController.getAuthorEdit);
authorRouter.post("/:id/update", authorController.postUpdateAuthor);

module.exports = authorRouter;
