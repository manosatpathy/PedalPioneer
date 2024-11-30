module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define("photo", {
    imageUrl: DataTypes.STRING,
    description: DataTypes.STRING,
    altDescription: DataTypes.STRING,
    dateSaved: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "users", key: "id" },
    },
  });

  Photo.associate = (models) => {
    Photo.belongsTo(models.user, { foreignKey: "userId", as: "user" });
  };

  Photo.associate = (models) => {
    Photo.hasMany(models.tag, { foreignKey: "photoId", as: "tags" });
  };

  return Photo;
};
