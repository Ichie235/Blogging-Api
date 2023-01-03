require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || process.env.APP_PORT,
  APP_SECRET: process.env.JWT_SECRET
};

