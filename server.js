const { getEnv } = require("./config");
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");
const errorHandler = require("./middleware/error");

//Connect to database
let server;

//Route Files
const bootcamps = require("./routes/bootcamps");
// const logger = require("./middleware/logger");

const app = express();

//Body parser
app.use(express.json());

//Dev logging middleware
// app.use(logger);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//Mount routers
app.use("/api/v1/bootcamps", bootcamps);

app.use(errorHandler);

const PORT = getEnv("PORT", 5000);
const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(PORT, () =>
      console.log(
        `Server running in ${getEnv("NODE_ENV", "development")} mode on port ${PORT}`
          .yellow.bold,
      ),
    );
  } catch (err) {
    console.log(`Startup error: ${err.message}`.red.bold);
    process.exit(1);
  }
};

startServer();

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);

  // Close server and exit process
  if (server) {
    server.close(() => process.exit(1));
    return;
  }

  process.exit(1);
});
