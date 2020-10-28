const path = require("path");
const express = require("express");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Rahul Sharma",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Rahul Sharma",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    help1: "Help for weather app!",
    help2: "help for about me!!",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is raining",
    location: "Delhi",
  });
});

// app.com
// app.com/help
// app.com/about

app.listen(5000, () => {
  console.log("Server started at port 5000");
});
