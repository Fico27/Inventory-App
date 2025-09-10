const express = require("express");
const app = express();
const bookRouter = require("./router/bookRouter");
const authorRouter = require("./router/authorRouter");
const genreRouter = require("./router/genreRouter");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", bookRouter);
app.use("/author", authorRouter);
app.use("/genre", genreRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});
