module.exports = (sequelize, DataTypes) => {
  const SearchHistory = sequelize.define("searchHistory", {
    query: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "users", key: "id" },
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
  SearchHistory.associate = (models) => {
    SearchHistory.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
  };
  return SearchHistory;
};
