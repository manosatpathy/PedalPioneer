const doesUserExist = require("../services/doesUserExist.js");
const validateUser = require("../validation/userValidation.js");
const {user} = require("../models");

const createNewUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const userExists = await doesUserExist(email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const isUserValid = validateUser(username, email);
    if (!isUserValid) {
      return res.status(400).json({ message: "Invalid username or email" });
    }
    const userData = await user.create({
      username: username,
      email: email,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", user: userData });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
};

module.exports = createNewUser;
