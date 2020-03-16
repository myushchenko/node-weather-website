const request = require("request");

const TOKEN = "a585c40feb792aaf2bd3ea006254e0a1";
const API_URL = "https://api.darksky.net/forecast";

const forecast = (latitude, longitude, callback) => {
  const url = `${API_URL}/${TOKEN}/${latitude},${longitude}?units=si&lang=uk`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      const { currently } = body;
      const { summary } = body.daily.data[0];
      callback(
        undefined,
        `${summary} Наразі ${
          currently.temperature
        } градусів. Ймовірність дощу становить ${currently.precipProbability *
          100}%.`
      );
    }
  });
};
module.exports = forecast;
