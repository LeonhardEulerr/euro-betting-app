const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const authenticate = require("../middleware/authenticate");

router.get("/users", authenticate, UserController.getUsers);
router.get("/username", authenticate, UserController.getUsername);

module.exports = router;
