const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messageController");

// Route to display all messages (visible to everyone, but show the author only to members)
router.get("/", messagesController.getAllMessages);

module.exports = router;