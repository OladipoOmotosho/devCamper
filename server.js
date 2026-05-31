const { getEnv } = require("./config");
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");

//Connect to database

connectDB();

//Route Files
const bootcamps = require("./routes/bootcamps");
// const logger = require("./middleware/logger");

const app = express();

//Dev logging middleware
// app.use(logger);

if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}
//Mount routers
app.use("/api/v1/bootcamps", bootcamps);

const PORT = getEnv("PORT", 5000);

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${getEnv("NODE_ENV", "development")} mode on port ${PORT}`
      .yellow.bold,
  ),
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);

  // Close server and exit process

  server.close(() => process.exit(1));
});
