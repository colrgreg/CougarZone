const express = require('express');
const app = express();

// Temporary storage for users (resets when server restarts)
const users = {};

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

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
    const { username, password } = req.body;
    users[username] = password;  // Store the user
    console.log('User registered:', username);
    res.redirect('/login');
});

// Dashboard page
// Dashboard page
app.get('/dashboard', (req, res) => {
    // Sample events data - you can later fetch this from a database or API
    const events = [
        {
            title: "Concert at Music Farm",
            date: "October 25, 2025",
            time: "8:00 PM",
            location: "Music Farm, 32 Ann St",
            description: "Live music featuring local Charleston bands."
        },
        {
            title: "CofC Basketball Game",
            date: "October 28, 2025",
            time: "7:00 PM",
            location: "TD Arena, 301 Meeting St",
            description: "Cougars vs. Citadel - home game!"
        },
        {
            title: "Art Walk on King Street",
            date: "November 1, 2025",
            time: "5:00 PM - 9:00 PM",
            location: "King Street, Downtown",
            description: "Monthly gallery walk featuring local artists."
        },
        {
            title: "Farmers Market",
            date: "October 26, 2025",
            time: "8:00 AM - 2:00 PM",
            location: "Marion Square",
            description: "Fresh produce, local vendors, and live music."
        },
        {
            title: "Study Session at Addlestone",
            date: "October 23, 2025",
            time: "6:00 PM - 9:00 PM",
            location: "Addlestone Library",
            description: "Group study session for midterms."
        }
    ];

    res.render('dashboard', { 
        username: 'Student',  // You'll want to pass the actual username later
        events: events 
    });
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
