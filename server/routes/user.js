const express = require("express");
const router = express.Router();
const createNewUser = require("../controllers/createNewUser.js");

router.post("/users", createNewUser);

module.exports = router;
