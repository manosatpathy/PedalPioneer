const { user } = require("../models");

const doesUserExist = async (email) => {
  try {
    console.log(user);
    const isExist = await user.findOne({ where: { email } });
    return !!isExist;
  } catch (err) {
    console.error("Error checking user existence.", err);
    throw err;
  }
};

module.exports = doesUserExist;
