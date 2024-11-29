const { tag } = require("../models");

const validateTagLimit = async (newTags, photoId) => {
  const existingTags = await tag.findAll({
    where: { photoId },
    attributes: ["name"],
  });
  const totalTags = existingTags.length + newTags.length;
  if (totalTags > 5) {
    return { valid: false, message: "A photo can have a maximum of 5 tags." };
  } else {
    return { valid: true };
  }
};

const validateTagFormat = (newTags) => {
  if (!Array.isArray(newTags)) {
    return { valid: false, message: "Tags must be provided as an array." };
  }

  if (newTags.length > 5) {
    return { valid: false, message: "A photo can have a maximum of 5 tags." };
  }
  for (const tagName of newTags) {
    if (
      typeof tagName !== "string" ||
      tagName.trim() === "" ||
      tagName.length > 20
    ) {
      return {
        valid: false,
        message: "Tag must be a non-empty string and up to 20 characters long.",
      };
    }
  }
  return { valid: true };
};

module.exports = { validateTagLimit, validateTagFormat };
