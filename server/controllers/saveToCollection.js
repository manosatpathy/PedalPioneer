const { validateTags, validateUrl } = require("../validation/imageValidation");
const Photo = require("../models/photo.js");
const Tag = require("../models/tag.js");

const saveToCollection = async (req, res) => {
  try {
    const { imageUrl, description, altDescription, tags, userId } = req.body;
    if (!imageUrl || !tags) {
      return res.status(400).json({
        message: "Missing required fields: imageUrl and/or tags.",
      });
    }
    const isUrlValid = validateUrl(imageUrl);
    const isTagValid = validateTags(tags);
    if (!isUrlValid) {
      return res.status(400).json({ message: "Invalid image URL." });
    }
    if (!isTagValid) {
      return res.status(400).json({
        message:
          "Invalid tags: Maximum 5 tags allowed, each up to 20 characters.",
      });
    }
    const photo = await Photo.create({
      imageUrl,
      description,
      altDescription,
      userId,
    });
    for (const tag of tags) {
      await Tag.create({ name: tag, photoId: photo.id });
    }
    return res.status(201).json({ message: "Photo saved successfully." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Error saving photo, ${err.message}` });
  }
};

module.exports = saveToCollection;
