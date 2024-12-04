const doesUserExist = require("../../../services/doesUserExist");
const { user } = require("../../../models");

jest.mock("../../../models", () => ({
  user: {
    findOne: jest.fn(),
  },
}));

describe("test doesUserExist service", () => {
  it("should return true if the user exist", async () => {
    user.findOne.mockResolvedValue({ id: 1, email: "manosatpathy@gmail.com" });
    const result = await doesUserExist("manosatpathy@gmail.com");
    expect(result).toBe(true);
    expect(user.findOne).toHaveBeenCalledWith({
      where: { email: "manosatpathy@gmail.com" },
    });
  });

  it("should return false if user does not exist", async () => {
    user.findOne.mockResolvedValue(null);
    const result = await doesUserExist("nonexistent@gmail.com");
    expect(result).toBe(false);
    expect(user.findOne).toHaveBeenCalledWith({
      where: { email: "nonexistent@gmail.com" },
    });
  });

  it("should throw error if a database error occurs", async () => {
    user.findOne.mockRejectedValue(new Error("DB Error"));
    await expect(doesUserExist("error@gmail.com")).rejects.toThrow("DB Error");
  });
});
