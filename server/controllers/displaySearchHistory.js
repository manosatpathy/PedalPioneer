const { user } = require("../models");
const { searchHistory } = require("../models");

const displaySearchHistory = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const validUser = await user.findByPk(userId);
    if (!validUser) {
      return res.status(404).json({ message: "user not found" });
    }
    const searchHistories = await searchHistory.findAll({
      where: { userId },
      attributes: ["query", "timestamp"],
    });
    return res.status(200).json({ searchHistory: searchHistories });
  } catch (err) {
    return res.status(
      (500).json({
        message: "Error displaying search history",
        error: err.message,
      })
    );
  }
};

module.exports = displaySearchHistory;
