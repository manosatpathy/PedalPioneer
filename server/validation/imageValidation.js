const validateUrl = (url) => {
  if (!url.startsWith("https://images.unsplash.com/")) {
    return { valid: false, message: "Invalid image URL." };
  }
  return { valid: true };
};

module.exports = { validateUrl };
