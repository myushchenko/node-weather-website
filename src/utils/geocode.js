const request = require("request");

const geocode = (address, callback) => {
  const access_token =
    "pk.eyJ1IjoibXl1c2hjaGVua28iLCJhIjoiY2s3a2xldGFzMDYxZTN0b2RnMWprb2lrNiJ9.M6sjAf6TI61OMOgjf3tUcQ";
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=" +
    access_token;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location service!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const { center, place_name } = body.features[0];
      const [longitude, latitude] = center;
      callback(undefined, {
        latitude,
        longitude,
        location: place_name
      });
    }
  });
};

module.exports = geocode;
