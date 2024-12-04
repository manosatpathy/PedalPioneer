const validateUser = require("../../../validation/userValidation");

describe("test userValidation function", () => {
  it("should return false if username is not a string", () => {
    const result = validateUser(1, "newuser@example.com");
    expect(result).toEqual(false);
  });
  it("should return false if email is not a string", () => {
    const result = validateUser("newUser", 12345);
    expect(result).toEqual(false);
  });
  it("should return false if email format is invalid", () => {
    const result = validateUser("newUser", "invalidemail.com");
    expect(result).toEqual(false);
  });
  it("should return true if both username and email are valid", () => {
    const result = validateUser("newUser", "newuser@example.com");
    expect(result).toEqual(true);
  });
});
