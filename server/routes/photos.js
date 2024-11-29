const express = require("express");
const router = express.Router();
const searchPhotos = require("../controllers/searchPhotos.js");
const saveToCollection = require("../controllers/saveToCollection.js");
const addTagsToPhoto = require("../controllers/addTagsToPhoto.js");

router.get("/photos/search", searchPhotos);
router.post("/photos", saveToCollection);
router.post("/photos/:photoId/tags", addTagsToPhoto);

module.exports = router;
