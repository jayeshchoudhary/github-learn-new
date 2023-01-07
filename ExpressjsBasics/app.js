const express = require("express");
const app = express();

const PORT = 8090;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// set the view engine to ejs
app.set("view engine", "ejs");

// search page
app.get("/", function (req, res) {
    res.render("pages/search");
});

// details page
app.get("/details", function (req, res) {
    res.render("pages/details");
});

app.all("*", function (req, res) {
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
