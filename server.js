const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("homepage");
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.post('/signup', (req, res) => {
    console.log(req.body);
    res.send("Thank you for signing up!");
});

app.listen(3000);

// npm init -y
// npm install express
// npm install ejs
// npm install nodemon
// npm run dev to run with nodemon
// view the website by inputting localhost:3000 in your browser
// install ejs language support in VS Code for better syntax highlighting