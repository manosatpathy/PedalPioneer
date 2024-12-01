const express = require("express");
const router = express.Router();
const displaySearchHistory = require("../controllers/displaySearchHistory.js");

router.get("/search-history", displaySearchHistory);

module.exports = router;
