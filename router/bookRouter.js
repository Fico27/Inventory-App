const { Router } = require("express");
const bookController = require("../controllers/bookController");
const bookRouter = Router();

bookRouter.get("/", bookController.getBooks);
bookRouter.get("/:id/edit", bookController.getBookEdit);
bookRouter.post("/:id/edit");

module.exports = bookRouter;
