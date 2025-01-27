const bcrypt = require("bcryptjs");
const db = require("../db/queries");
require("dotenv").config();
const passport = require("passport");

exports.signup = async (req, res) => {
    const { first_name, last_name, username, password, confirmPassword } = req.body;

    // Validate confirmPassword
    if (password !== confirmPassword) {
        req.flash("error", "Passwords do not match");
        return res.redirect("/auth/signup");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    try {
        await db.createUser(first_name, last_name, username, hashedPassword, false, false);
        req.flash("success", "Account created successfully. Please log in.");
        res.redirect("/auth/login");
    } catch (err) {
        console.error(err);
        req.flash("error", "An error occurred. Please try again.");
        res.redirect("/auth/signup");
    }
};

exports.login = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
});

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "Logged out successfully.");
        res.redirect("/");
    });
};

exports.joinClub = async (req, res) => {
    const { passcode } = req.body;

    // Check if the passcode is correct
    if (passcode === process.env.CLUB_PASSCODE) {
        try {
            // Update user membership status
            await db.updateMembershipStatus(req.user.id, true); // Use req.user.id instead of req.session.user_id
            req.user.membership_status = true; // Update the user object
            req.flash("success", "Welcome to the club!");
            res.redirect("/");
        } catch (err) {
            console.error(err);
            req.flash("error", "An error occurred. Please try again.");
            res.redirect("/auth/join");
        }
    } else {
        req.flash("error", "Incorrect passcode.");
        res.redirect("/auth/join");
    }
};


// Check if user is logged in
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You must be logged in to access this page.");
    res.redirect("/auth/login");
};

// Check if user is a member
exports.isMember = (req, res, next) => {
    if (req.isAuthenticated() && req.user.membership_status) {
        return next();
    }
    req.flash("error", "You must be a club member to view this page.");
    res.redirect("/");
};

// Check if user is an admin
exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.is_admin) {
        return next();
    }
    req.flash("error", "You must be an admin to view this page.");
    res.redirect("/");
};


