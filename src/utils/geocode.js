const axios = require("axios");

/** 
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?&access_token=pk.eyJ1Ijoic2xhcG1hY2hpbmUiLCJhIjoiY2tld2YzMnk5M2gyNTJybXFidTJjODZmaSJ9.XzszQZ7S_wynFOeX7mZgwQ&limit=1";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another Search!");
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};
*/

const geocode = async (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?&access_token=pk.eyJ1Ijoic2xhcG1hY2hpbmUiLCJhIjoiY2tld2YzMnk5M2gyNTJybXFidTJjODZmaSJ9.XzszQZ7S_wynFOeX7mZgwQ&limit=1";

  const { data } = await axios({
    method: "get",
    url: url,
  });
  if (!data) {
    return callback("Unable to find Location. Try another Search!");
  } else if (data.features.length === 0) {
    callback("Unable to find location. Try another Search!");
  } else {
    callback(undefined, {
      latitude: data.features[0].center[1],
      longitude: data.features[0].center[0],
      location: data.features[0].place_name,
    });
  }
};

module.exports = geocode;
