const express = require("express");
const router = express.Router();
const searchPhotos = require("../controllers/searchPhotos.js");
const saveToCollection = require("../controllers/saveToCollection.js");

router.get("/photos/search", searchPhotos);
router.post("/photos", saveToCollection);

module.exports = router;
