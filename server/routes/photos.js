const express = require("express");
const router = express.Router();
const searchPhotos = require("../controllers/searchPhotos.js");

router.get("/photos/search", searchPhotos);

module.exports = router;
