const searchImages = require("../services/searchImages");

const searchPhotos = async (req, res) => {
  try {
    const searchTerm = req.query.query;
    if (!searchTerm || searchTerm.trim() === "") {
      return res.status(400).json({ message: "Search term is required." });
    }
    const results = await searchImages(searchTerm);
    if (results.length === 0) {
      return res
        .status(400)
        .json({ message: "No images found for the given query." });
    }
    return res.status(200).json({ photos: results });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = searchPhotos;
