const { Op } = require("sequelize");
const { searchHistory } = require("../models");
const { tag } = require("../models");
const { photo } = require("../models");
const { user } = require("../models");

const searchPhotosWithTags = async (req, res) => {
  try {
    const { tags, sort, userId } = req.query;
    if (!tags || typeof tags != "string" || tags.trim() === "") {
      return res.status(400).json({ message: "A valid tag is required" });
    }
    if (userId) {
      const validUser = await user.findByPk(userId);
      if (!validUser) {
        return res.status(404).json({ message: "User does not exist." });
      }
    }
    await searchHistory.create({
      userId,
      query: tags,
    });
    const tagRecords = await tag.findAll({
      where: { name: tags },
      attributes: ["photoId"],
    });
    if (tagRecords.length === 0) {
      return res
        .status(404)
        .json({ message: "No photos found for the provided tag." });
    }
    const photoIds = tagRecords.map((record) => record.photoId);
    const sortOrder = sort || "ASC";
    const photos = await photo.findAll({
      where: { id: { [Op.in]: photoIds } },
      order: [["dateSaved", sortOrder]],
      attributes: ["id", "imageUrl", "description", "dateSaved"],
      include: [
        {
          model: tag,
          attributes: ["name"],
          as: "tags",
        },
      ],
    });
    const result = photos.map((photo) => ({
      id: photo.id,
      imageUrl: photo.imageUrl,
      description: photo.description,
      dateSaved: photo.dateSaved,
      tags: photo.tags.map((t) => t.name),
    }));
    return res.status(200).json({ photos: result });
  } catch (err) {
    return res.status(500).json({
      message: "An error occurred while fetching photos.",
      error: err.message,
    });
  }
};

module.exports = searchPhotosWithTags;
