const { Router } = require("express");
const bookController = require("../controllers/bookController");
const bookRouter = Router();

bookRouter.get("/", bookController.getBooks);
bookRouter.get("/:id/edit", bookController.getBookEdit);
bookRouter.post("/:id/update", bookController.postUpdateBook);
bookRouter.post("/:id/delete", bookController.deleteBook);

module.exports = bookRouter;
