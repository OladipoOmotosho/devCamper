const NodeGeocoder = require("node-geocoder");
const { getEnv } = require("../config");

const options = {
  provider: getEnv("GEOCODER_PROVIDER", { defaultValue: "mapquest" }),
  httpAdapter: "https",
  apiKey: getEnv("GEOCODER_API_KEY"),
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
