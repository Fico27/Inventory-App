const { Router } = require("express");
const inventoryRouter = Router();

inventoryRouter.get("/", (req, res) => {
  res.send("Index Routing is working!");
});

module.exports = inventoryRouter;
