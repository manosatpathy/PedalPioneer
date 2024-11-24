const validateUser = (username, email) => {
  if (typeof username === "string" && typeof email === "string") {
    return /@.*\./.test(email);
  } else {
    return false;
  }
};

module.exports = validateUser;
