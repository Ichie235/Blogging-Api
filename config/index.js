require("dotenv").config();

module.exports = {
  DB: process.env.APP_DB,
  PORT: process.env.PORT || process.env.APP_PORT,
  APP_SECRET: process.env.JWT_SECRET
};

