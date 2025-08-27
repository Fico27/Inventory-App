const { Router } = require("express");
const bookRouter = Router();

bookRouter.get("/", (req, res) => {
  res.render("index");
});

module.exports = bookRouter;
