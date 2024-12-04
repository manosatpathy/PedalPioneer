const searchImages = require("../../services/searchImages");
const axios = require("axios");

jest.mock("axios");

describe("test searchImages function", () => {
  it("should get photos by query", async () => {
    const mockResponse = {
      data: {
        results: [
          {
            urls: {
              regular:
                "https://images.unsplash.com/photo-1468781840274-cbaa1abd0f12",
            },
            description: "Bicycles on the beach",
            alt_description:
              "four assorted-color commuter bikes near hill at daytime",
          },
          {
            urls: {
              regular:
                "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c",
            },
            description: "Tour de France peloton in rainy weather.",
            alt_description: "people riding bicycle on road during daytime",
          },
          {
            urls: {
              regular:
                "https://images.unsplash.com/photo-1509562102516-df32c4369506",
            },
            description: "On the way to Passau (Germany)",
            alt_description: "grayscale photo of bikes on rack",
          },
        ],
      },
    };

    axios.get.mockResolvedValue(mockResponse);
    const result = await searchImages("bikes");
    const expected = [
      {
        imageUrl:
          "https://images.unsplash.com/photo-1468781840274-cbaa1abd0f12",
        description: "Bicycles on the beach",
        altDescription:
          "four assorted-color commuter bikes near hill at daytime",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c",
        description: "Tour de France peloton in rainy weather.",
        altDescription: "people riding bicycle on road during daytime",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1509562102516-df32c4369506",
        description: "On the way to Passau (Germany)",
        altDescription: "grayscale photo of bikes on rack",
      },
    ];
    expect(result).toEqual(expected);
    expect(axios.get).toHaveBeenCalledWith(
      "https://api.unsplash.com/search/photos?query=bikes",
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );
  });
  it("should throw an error if the api call fails", async () => {
    axios.get.mockRejectedValue(new Error("API Error"));
    await expect(searchImages("bikes")).rejects.toThrow(
      "Failed to fetch images: API Error"
    );
  });
});