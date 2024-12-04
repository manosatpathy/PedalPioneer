const { validateUrl } = require("../../../validation/imageValidation");

describe("test validate url function", () => {
  it("should return valid true for correct url", () => {
    const result = validateUrl("https://images.unsplash.com/sample-image");
    expect(result).toEqual({ valid: true });
  });
  it("should return false with message for invalid url", () => {
    const result = validateUrl("https://unsplash.com/sample-image");
    expect(result).toEqual({ valid: false, message: "Invalid image URL." });
  });
});
