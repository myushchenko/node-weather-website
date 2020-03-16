const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const PORT = process.env.PORT || 3000;

// Define paths for Express config
const CLIENT_PATH = path.join(__dirname, "../public");
const VIEWS_PATH = path.join(__dirname, "../templates/views");
const PARTIALS_PATH = path.join(__dirname, "../templates/partials");

const app = express();

// Setup handlebars engine view location
app.set("view engine", "hbs");
app.set("views", VIEWS_PATH);
hbs.registerPartials(PARTIALS_PATH);

// Setup static directory to serve
app.use(express.static(CLIENT_PATH));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Mykhailo"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Mykhailo"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some help text",
    name: "Mykhailo"
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: "You must provide an address!"
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, message) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: message,
        location,
        address
      });
    });
  });
});

app.get("/products", (req, res) => {
  const { search, rating } = req.query;
  if (!search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(search, rating);
  res.send({
    products: []
  });
});

// (*) - wild card match
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mykhailo",
    errorMessage: "Help article not found."
  });
});

// Match other cases: 404 page
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mykhailo",
    errorMessage: "Page not found."
  });
});

app.listen(PORT, () => {
  console.log(`Server is up  on port ${PORT}.`);
});
