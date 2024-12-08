const { validateUrl } = require("../../../validation/imageValidation");
const { validateTagFormat } = require("../../../validation/tagValidation");
const { photo, tag } = require("../../../models");
const saveToCollection = require("../../../controllers/saveToCollection");

jest.mock("../../../validation/imageValidation");
jest.mock("../../../validation/tagValidation");
jest.mock("../../../models", () => ({
  photo: {
    create: jest.fn(),
  },
  tag: {
    create: jest.fn(),
  },
}));

describe("test saveToCollection controller", () => {
  let req, res;
  beforeEach(() => {
    req = {
      body: {
        imageUrl:
          "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzkwODd8MHwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHx8fHwxNzMzNTY3MTM1fDA&ixlib=rb-4.0.3&q=80&w=1080",
        description: "Beautiful landscape",
        altDescription: "Mountain view",
        tags: ["nature", "ocean"],
        userId: 1,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return 400 if imageUrl is missing", async () => {
    req.body.imageUrl = null;

    await saveToCollection(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Missing required fields: imageUrl and/or tags.",
    });
  });

  it("should return 400 if tags are missing", async () => {
    req.body.tags = null;

    await saveToCollection(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Missing required fields: imageUrl and/or tags.",
    });
  });

  it("should return 400 if the URL is invalid", async () => {
    validateUrl.mockReturnValue({
      valid: false,
      message: "Invalid URL format.",
    });

    await saveToCollection(req, res);

    expect(validateUrl).toHaveBeenCalledWith(
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzkwODd8MHwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHx8fHwxNzMzNTY3MTM1fDA&ixlib=rb-4.0.3&q=80&w=1080"
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid URL format." });
  });
  it("should return 400 if the tag format is invalid", async () => {
    validateUrl.mockReturnValue({ valid: true });
    validateTagFormat.mockReturnValue({
      valid: false,
      message: "Invalid tag format.",
    });
    await saveToCollection(req, res);
    expect(validateTagFormat).toHaveBeenCalledWith(["nature", "ocean"]);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid tag format." });
  });
  it("should save the photo and tags and return 201", async () => {
    validateUrl.mockReturnValue({ valid: true });
    validateTagFormat.mockReturnValue({ valid: true });
    photo.create.mockResolvedValue({ id: 123 });

    await saveToCollection(req, res);

    expect(photo.create).toHaveBeenCalledWith({
      imageUrl:
        "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzkwODd8MHwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHx8fHwxNzMzNTY3MTM1fDA&ixlib=rb-4.0.3&q=80&w=1080",
      description: "Beautiful landscape",
      altDescription: "Mountain view",
      userId: 1,
    });

    expect(tag.create).toHaveBeenCalledTimes(2);
    expect(tag.create).toHaveBeenCalledWith({ name: "nature", photoId: 123 });
    expect(tag.create).toHaveBeenCalledWith({ name: "ocean", photoId: 123 });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Photo saved successfully.",
    });
  });
  it("should return 500 if an error occurs", async () => {
    const errorMessage = "Database error";
    validateUrl.mockReturnValue({ valid: true });
    validateTagFormat.mockReturnValue({ valid: true });
    photo.create.mockRejectedValue(new Error(errorMessage));

    await saveToCollection(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: `Error saving photo, ${errorMessage}`,
    });
  });
});
