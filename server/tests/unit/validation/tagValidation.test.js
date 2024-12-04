const {
  validateTagLimit,
  validateTagFormat,
} = require("../../../validation/tagValidation");
const { tag } = require("../../../models");

jest.mock("../../../models", () => ({
  tag: {
    findAll: jest.fn(),
  },
}));

describe("test tagValidation functions", () => {
  it("should validate tag limit", async () => {
    const mockResponse = [{ name: "nature" }, { name: "wildlife" }];
    tag.findAll.mockResolvedValue(mockResponse);
    const result = await validateTagLimit(["ocean"], 1);
    expect(result).toEqual({ valid: true });
    expect(tag.findAll).toHaveBeenCalledWith({
      where: { photoId: 1 },
      attributes: ["name"],
    });
  });
});
