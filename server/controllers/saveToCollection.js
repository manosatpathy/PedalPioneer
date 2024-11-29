const { validateUrl } = require("../validation/imageValidation");
const { validateTagFormat } = require("../validation/tagValidation");
const { photo } = require("../models");
const { tag } = require("../models");

const saveToCollection = async (req, res) => {
  try {
    const { imageUrl, description, altDescription, tags, userId } = req.body;
    if (!imageUrl || !tags) {
      return res.status(400).json({
        message: "Missing required fields: imageUrl and/or tags.",
      });
    }
    const urlFormat = validateUrl(imageUrl);
    const tagFormat = validateTagFormat(tags);
    if (!urlFormat.valid) {
      return res.status(400).json({ message: urlFormat.message });
    }
    if (!tagFormat.valid) {
      return res.status(400).json({
        message: tagFormat.message,
      });
    }
    const image = await photo.create({
      imageUrl,
      description,
      altDescription,
      userId,
    });
    for (const tagName of tags) {
      await tag.create({ name: tagName, photoId: image.id });
    }
    return res.status(201).json({ message: "Photo saved successfully." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Error saving photo, ${err.message}` });
  }
};

module.exports = saveToCollection;
