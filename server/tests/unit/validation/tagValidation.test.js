const {
  validateTagLimit,
  validateTagFormat,
} = require("../../../validation/tagValidation");
const { tag } = require("../../../models");
const { where } = require("sequelize");

jest.mock("../../../models", () => ({
  tag: {
    findAll: jest.fn(),
  },
}));

describe("test tagValidation functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return valid: true if total tags are within the limit", async () => {
    const mockResponse = [{ name: "nature" }, { name: "wildlife" }];
    tag.findAll.mockResolvedValue(mockResponse);
    const result = await validateTagLimit(["ocean"], 1);
    expect(result).toEqual({ valid: true });
    expect(tag.findAll).toHaveBeenCalledWith({
      where: { photoId: 1 },
      attributes: ["name"],
    });
  });

  it("should return valid: false with message if total tags exceed the limit", async () => {
    const mockResponse = [
      { name: "bikes" },
      { name: "wildlife" },
      { name: "beach" },
      { name: "sky" },
    ];
    tag.findAll.mockResolvedValue(mockResponse);
    const result = await validateTagLimit(["ocean", "river"], 1);
    expect(result).toEqual({
      valid: false,
      message: "A photo can have a maximum of 5 tags.",
    });
    expect(tag.findAll).toHaveBeenCalledWith({
      where: { photoId: 1 },
      attributes: ["name"],
    });
  });

  it("should return valid: true if tags are in valid Format", () => {
    const result = validateTagFormat(["newTag1", "newTag2"]);
    expect(result).toEqual({ valid: true });
  });
  it("should return valid: false with message if input is not an valid array", () => {
    const result = validateTagFormat("newTag1", "newTag2");
    expect(result).toEqual({
      valid: false,
      message: "Tags must be provided as an array.",
    });
  });
  it("should return valid: false with message if array length exceed 5", () => {
    const result = validateTagFormat([
      "tag1",
      "tag2",
      "tag3",
      "tag4",
      "tag5",
      "tag6",
    ]);
    expect(result).toEqual({
      valid: false,
      message: "A photo can have a maximum of 5 tags.",
    });
  });
  it("should return valid: false if any tag is not a string", () => {
    const result = validateTagFormat(["tag1", 123, "tag3"]);
    expect(result).toEqual({
      valid: false,
      message: "Tag must be a non-empty string and up to 20 characters long.",
    });
  });

  it("should return valid: false if any tag is an empty string", () => {
    const result = validateTagFormat(["tag1", " ", "tag3"]);
    expect(result).toEqual({
      valid: false,
      message: "Tag must be a non-empty string and up to 20 characters long.",
    });
  });

  it("should return valid: false if any tag exceeds 20 characters", () => {
    const result = validateTagFormat([
      "tag1",
      "thisisaverylongtagthatexceeds20chars",
      "tag3",
    ]);
    expect(result).toEqual({
      valid: false,
      message: "Tag must be a non-empty string and up to 20 characters long.",
    });
  });
});
