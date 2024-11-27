module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define("tag", {
    name: DataTypes.STRING,
    photoId: {
      type: DataTypes.INTEGER,
      references: { model: "photos", key: "id" },
    },
  });

  Tag.associate = (models) => {
    Tag.belongsTo(models.photo, { foreignKey: "photoId", as: "photo" });
  };

  return Tag;
};
