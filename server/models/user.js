module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
  });
  return User;
};
