const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public")); // serves all your JS files in public/

// Homepage
app.get('/', (req, res) => {
    res.render("homepage");
});

// Login page
app.get('/login', (req, res) => {
    res.render("login");
});

// Signup page
app.get('/signup', (req, res) => {
    res.render("signup");
});

// Dashboard page (Firebase protects frontend)
app.get('/dashboard', (req, res) => {
    res.render("dashboard");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
