const { Router } = require("express");
const bookController = require("../controllers/bookController");
const bookRouter = Router();

bookRouter.get("/", bookController.getBooks);
bookRouter.get("/:id/edit", bookController.getBookEdit);
bookRouter.get("/newbook", bookController.getAddBook);
bookRouter.post("/:id/update", bookController.postUpdateBook);
bookRouter.post("/:id/delete", bookController.deleteBook);
bookRouter.post("/create", bookController.postAddBook);

module.exports = bookRouter;
