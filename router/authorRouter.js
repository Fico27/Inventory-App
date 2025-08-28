const { Router } = require("express");
const authorRouter = Router();
const authorController = require("../controllers/authorController");

authorRouter.get("/", authorController.getAuthors);

module.exports = authorRouter;
