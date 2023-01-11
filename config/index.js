require("dotenv").config();

module.exports = {
  MONGODB_URI:process.env.MONGODB_URI,
  PORT: process.env.PORT || process.env.APP_PORT,
  APP_SECRET: process.env.JWT_SECRET
};

