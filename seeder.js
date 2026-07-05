const fs = require("fs");
require("colors");
const { getEnv } = require("./config");

// load models
const Bootcamp = require("./models/Bootcamp");
const mongoose = require("mongoose");

//Connect to DB
mongoose.connect(getEnv("MONGO_URI", { required: true })).catch((err) => {
  console.error(`DB connection error: ${err.message}`.red);
  process.exit(1);
});

//Read JSON FILES
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8"),
);

// Import into DB

const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);

    console.log("Data Imported....".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
// Delete data in DB

const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();

    console.log("Data deleted....".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }

  if (process.argv[2] === "-i") {
    importData();
  } else if (process.argv[2] === "-d") {
    deleteData();
  } else {
    console.log("Please add a proper flag: -i (import) or -d (delete)".yellow);
    process.exit();
  }
};
