const { Router } = require("express");
const authorRouter = Router();

authorRouter.get("/", (req, res) => {
  res.render("author");
});

module.exports = authorRouter;
