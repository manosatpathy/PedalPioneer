const createNewUser = require("../../../controllers/createNewUser");
const doesUserExist = require("../../../services/doesUserExist");
const validateUser = require("../../../validation/userValidation");
const { user } = require("../../../models");

jest.mock("../../../services/doesUserExist");
jest.mock("../../../validation/userValidation");
jest.mock("../../../models", () => ({
  user: {
    create: jest.fn(),
  },
}));

describe("test createNewUser controller", () => {
  let req, res;
  beforeEach(() => {
    req = {
      body: { username: "testuser", email: "test@example.com" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if user already exists", async () => {
    doesUserExist.mockResolvedValue(true);
    await createNewUser(req, res);
    expect(doesUserExist).toHaveBeenCalledWith("test@example.com");
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
  });
  it("should return 400 for invalid username or email", async () => {
    doesUserExist.mockResolvedValue(false);
    validateUser.mockReturnValue(false);
    await createNewUser(req, res);
    expect(validateUser).toHaveBeenCalledWith("testuser", "test@example.com");
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid username or email",
    });
  });
  it("should return 201 if user created successfully", async () => {
    const mockUser = { id: 1, username: "testuser", email: "test@example.com" };
    doesUserExist.mockResolvedValue(false);
    validateUser.mockResolvedValue(true);
    user.create.mockResolvedValue(mockUser);
    await createNewUser(req, res);
    expect(user.create).toHaveBeenCalledWith({
      username: "testuser",
      email: "test@example.com",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User created successfully",
      user: mockUser,
    });
  });
  it("should return 500 if an error occurs during user creation", async () => {
    const errorMessage = "Database error";
    doesUserExist.mockResolvedValue(false);
    validateUser.mockReturnValue(true);
    user.create.mockRejectedValue(new Error(errorMessage));
    await createNewUser(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error creating user",
      error: errorMessage,
    });
  });
});