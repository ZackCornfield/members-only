const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messageController");
const { isLoggedIn, isMember, isAdmin } = require("../controllers/authController");

// Route to display a form for creating a new message (only for logged-in members)
router.get("/new", isLoggedIn, messagesController.createMessageForm);

// Route to submit a new message (only for logged-in members)
router.post("/new", isLoggedIn, messagesController.createMessage);

// Route to delete a message (only for admins)
router.post("/:id/delete", isLoggedIn, isAdmin, messagesController.deleteMessage);

module.exports = router;
