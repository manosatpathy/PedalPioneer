const axios = require("axios");
require("dotenv").config();

const searchImages = async (query) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${query}`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );
    const photos = response.data.results.map((photo) => {
      return {
        imageUrl: photo.urls.regular,
        description: photo.description,
        altDescription: photo.alt_description,
      };
    });
    return photos;
  } catch (err) {
    throw new Error(`Failed to fetch images: ${err.message}`);
  }
};

module.exports = searchImages;
