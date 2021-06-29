const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

dotenv.config();
const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Rahul Sharma',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Rahul Sharma',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text',
    title: 'Help',
    name: 'Rahul Sharma',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a location (:',
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    helpMessage: 'Help Article not found (:',
    name: 'Rahul Sharma',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    helpMessage: 'Page not found',
    name: 'Rahul Sharma',
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `
  ################################################
  🛡️  Server listening on port: ${process.env.port} 🛡️
  ################################################
`,
  );
});
