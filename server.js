const bcrypt = require('bcrypt');
const express = require('express');
const db = require('better-sqlite3')('cougarZone.db');
db.pragma('journal_mode = WAL');
const app = express();

//database setup  start
const createTables = db.transaction (() => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username STRING NOT NULL UNIQUE,
            password STRING NOT NULL
        );
    `).run();
});

createTables();
//database setup end

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(function (req, res, next) {
    res.locals.errors = [];
    next();
})

app.get('/', (req, res) => {
    res.render("homepage");
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.post('/signup', (req, res) => {
    const errors = [];

    if (typeof req.body.username !== 'string') req.body.username = "";
    if (typeof req.body.password !== 'string') req.body.password = "";
    
    req.body.username = req.body.username.trim();
    req.body.password = req.body.password.trim();

    if (!req.body.username) errors.push("Username is required.");
    if (!req.body.password) errors.push("Password is required.");
    if (req.body.username && req.body.username.length > 20) errors.push("Username cannot exceed 20 characters.");
    if (req.body.username && req.body.username.length < 3) errors.push("Username must be at least 3 characters long.");
    if (req.body.password && req.body.password.length < 6) errors.push("Password must be at least 6 characters long.");
    if (req.body.password && req.body.password.length > 50) errors.push("Password cannot exceed 50 characters.");
    if (req.body.username && !req.body.username.match(/^[a-zA-Z0-9]+$/)) errors.push("Username can only contain letters and numbers.");

    if (errors.length) {
        return res.render("homepage", { errors });
    }
    
    //save new user to database
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    const registerStatement = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    registerStatement.run(req.body.username, req.body.password);

    //log user in with cookie?

    res.send("Account created successfully!");
});

app.listen(3000);

// npm init -y
// npm install express
// npm install ejs
// npm install nodemon
// npm run dev to run with nodemon
// view the website by inputting localhost:3000 in your browser
// install ejs language support in VS Code for better syntax highlighting
// npm install better-sqlite3