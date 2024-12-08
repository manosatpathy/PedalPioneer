const searchPhotos = require("../../../controllers/searchPhotos");
const searchImages = require("../../../services/searchImages");

jest.mock("../../../services/searchImages");

describe("test searchPhotos controller", () => {
  let req, res;
  beforeEach(() => {
    req = { query: { query: "nature" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 404 if search term is not provided", async () => {
    req.query.query = "";
    await searchPhotos(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Search term is required.",
    });
  });
  it("should return 400 if no images are found", async () => {
    searchImages.mockResolvedValue([]);
    await searchPhotos(req, res);
    expect(searchImages).toHaveBeenCalledWith("nature");
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "No images found for the given query.",
    });
  });
  it("should return 200 with list of photos when images are found", async () => {
    const mockResult = [
      { id: 1, url: "https://example.com/image1.jpg" },
      { id: 2, url: "https://example.com/image2.jpg" },
    ];
    searchImages.mockResolvedValue(mockResult);
    await searchPhotos(req, res);
    expect(searchImages).toHaveBeenCalledWith("nature");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ photos: mockResult });
  });
  it("should return 500 if an error occurs", async () => {
    const errorMessage = "something went wrong";
    searchImages.mockRejectedValue(new Error(errorMessage));
    await searchPhotos(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
