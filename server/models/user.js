module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasMany(models.photo, { foreignKey: "userId", as: "photos" });
    User.hasMany(models.searchHistory, {
      foreignKey: "userId",
      as: "searchHistory",
    });
  };
  return User;
};
