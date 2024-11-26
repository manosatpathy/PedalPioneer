const { validateTags, validateUrl } = require("../validation/imageValidation");
const photo = require("../models/photo.js");

const saveToCollection = async (req, res) => {
  try {
    const imgData = req.body;
    if (!imgData.imageUrl || !imgData.tags) {
      return res.status(400).json({
        message: "Missing required fields: imageUrl and/or tags.",
      });
    }
    const isUrlValid = validateUrl(imgData.imageUrl);
    const isTagValid = validateTags(imgData.tags);
    if (!isUrlValid) {
      return res.status(400).json({ message: "Invalid image URL." });
    }
    if (!isTagValid) {
      return res.status(400).json({
        message:
          "Invalid tags: Maximum 5 tags allowed, each up to 20 characters.",
      });
    }
    await photo.create(imgData);
    return res.status(201).json({ message: "photo saved to the collection." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Error saving photo, ${err.message}` });
  }
};

module.exports = saveToCollection;
