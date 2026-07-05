const path = require("path");
const dotenv = require("dotenv");

// Load environment variables once, early in the process.
dotenv.config({
  path: path.resolve(__dirname, "config.env"),
  debug: false,
});

const getEnv = (key, options = {}) => {
  const { defaultValue, required = false } = options;
  const value = process.env[key];

  if (value !== undefined) {
    return value;
  }
  if (defaultValue !== undefined) {
    return defaultValue;
  }
  if (required) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return undefined;
};

module.exports = {
  getEnv,
};
