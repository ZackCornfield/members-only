const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/signup", (req, res) => res.render("signup"));
router.post("/signup", authController.signup);

router.get("/login", (req, res) => res.render("login"));
router.post("/login", authController.login);  

router.get("/logout", authController.logout);

router.get("/join", (req, res) => res.render("joinClub"));  
router.post("/join", authController.joinClub);

module.exports = router;