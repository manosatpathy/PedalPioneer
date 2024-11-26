const validateUrl = (url) => {
  return url.startsWith("https://images.unsplash.com/");
};

const validateTags = (tags) =>
  tags.length <= 5 && tags.every((tag) => tag.length <= 20);

module.exports = { validateTags, validateUrl };
