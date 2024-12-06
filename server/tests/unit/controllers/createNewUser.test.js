const createNewUser = require("../controllers/createNewUser");
const doesUserExist = require("../services/doesUserExist");
const validateUser = require("../validation/userValidation");
const { user } = require("../models");

jest.mock("../services/doesUserExist");
jest.mock("../validation/userValidation");
jest.mock("../models", () => ({
  user: {
    create: jest.fn(),
  },
}));
