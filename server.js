const bcrypt = require('bcrypt');
const express = require('express');
const db = require('better-sqlite3')('cougarZone.db');
db.pragma('journal_mode = WAL');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(function (req, res, next) {
    res.locals.errors = [];
    next();
})

// Homepage (signup form)
app.get('/', (req, res) => {
    res.render("homepage");
});

// GET login page
app.get('/login', (req, res) => {
    res.render("login"); // Just render login.ejs
});

// POST login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username] === password) {
        res.redirect('/dashboard'); // Successful login
    } else {
        res.redirect('/login?error=1'); // Failed login sends user back with query
    }
});

// POST signup
app.post('/signup', (req, res) => {
    console.log(req.body);
    res.send("Thank you for signing up!");
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});


// npm init -y
// npm install express
// npm install ejs
// npm install nodemon
// npm run dev to run with nodemon
// view the website by inputting localhost:3000 in your browser
// install ejs language support in VS Code for better syntax highlighting