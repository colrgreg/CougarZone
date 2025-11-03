const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => res.render("signup"));
app.get("/login", (req, res) => res.render("login"));
app.get("/dashboard", (req, res) => res.render("dashboard"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
