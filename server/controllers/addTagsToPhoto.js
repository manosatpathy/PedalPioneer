const { tag } = require("../models");
const {
  validateTagLimit,
  validateTagFormat,
} = require("../validation/tagValidation");

const addTagsToPhoto = async (req, res) => {
  try {
    const photoId = req.params.photoId;
    const { tags } = req.body;
    const tagFormat = validateTagFormat(tags);
    if (!tagFormat.valid) {
      return res.status(400).json({ message: tagFormat.message });
    }
    const tagLimit = await validateTagLimit(tags, photoId);
    if (!tagLimit.valid) {
      return res.status(400).json({ message: tagLimit.message });
    }
    for (const tagName of tags) {
      await tag.create({ name: tagName, photoId: photoId });
    }
    return res.status(200).json({message:"Tags added successfully"})
  } catch (err) {
    console.error({
      message: "Error adding Tags to Photos",
      Errort: err.message,
    });
  }
};

module.exports = addTagsToPhoto;
