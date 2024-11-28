const express = require("express");
const app = express();
require("dotenv").config();
const { sequelize } = require("./models");
const PORT = process.env.PORT;
app.use(express.json());

const photosRoutes = require("./routes/photos.js");
const usersRoutes = require("./routes/user.js");

app.use("/api", photosRoutes);
app.use("/api", usersRoutes);

sequelize
  .authenticate()
  .then(() => console.log("database connected"))
  .catch((error) => {
    console.error("Unable to connect to database", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});