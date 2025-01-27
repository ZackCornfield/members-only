const db = require("../db/queries"); 
const { validationResult } = require("express-validator");

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await db.getAllMessagesAndAuthors();

        console.log(messages);

        res.render("index", { messages: messages });
    } catch (err) {
        console.error(err);
        req.flash("error", "An error occurred while fetching messages.");
        res.redirect("/");
    }
};

exports.createMessageForm = (req, res) => {
    res.render("messageForm");
};

exports.createMessage = async (req, res) => {
    const { title, text } = req.body;

    // Validation 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("error", "Please fill in all fields.");
        return res.redirect("/messages/new");
    }

    try {
        // Insert message into the database
        await db.createMessage(title, text, req.user.id); 
        req.flash("success", "Message created successfully!");
        res.redirect("/"); // Redirect to the homepage 
    } catch (err) {
        console.error(err);
        req.flash("error", "An error occurred while creating the message.");
        res.redirect("/messages/new");
    }
};

exports.deleteMessage = async (req, res) => {
    const messageId = req.params.id;

    try {
        // Check if the message exists and the user is an admin
        const message = await db.getMessageById(messageId);

        if (!message) {
            req.flash("error", "Message not found.");
            return res.redirect("/");
        }

        // Delete the message if the user is an admin
        await db.deleteMessage(messageId);
        req.flash("success", "Message deleted successfully.");
        res.redirect("/"); // Redirect after deletion
    } catch (err) {
        console.error(err);
        req.flash("error", "An error occurred while deleting the message.");
        res.redirect("/");
    }
};
