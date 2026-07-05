const mongoose = require("mongoose");
const { getEnv } = require("./index");

const connectDB = async () => {
  const conn = await mongoose.connect(getEnv("MONGO_URI", { required: true }));

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
