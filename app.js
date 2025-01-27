// Import necessary modules
const express = require("express");
const path = require("node:path");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();

// Initialize app
const app = express();

// Import routes
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const messageRouter = require("./routes/messages");

// Configure Passport
require("./config/passport")(passport); // Pass passport to the config file

// Set up static assets (e.g., CSS, images)
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Parse URL-encoded bodies (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

// Set up session middleware with a secret key for session handling
app.use(
    session({
        secret: process.env.SESSION_SECRET || "yourSecretKey", // Use environment variable for secret
        resave: false,
        saveUninitialized: false,
    })
);

// Flash messages setup
app.use(flash());

// Middleware to make flash messages available to views
app.use((req, res, next) => {
    res.locals.success_message = req.flash("success");
    res.locals.error_message = req.flash("error");
    next();
});

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

// Make session data (user info) available in EJS templates
app.use((req, res, next) => {
    res.locals.user = req.user; // Passport adds `req.user` for authenticated users
    next();
});

// Set up routers
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/messages", messageRouter);

// Set EJS view engine and views directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Define server port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
