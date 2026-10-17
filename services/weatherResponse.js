const axios = require('axios');

async function getWeatherResponse(url, options = {}) {
  if (!process.env.OPENWEATHER_API_KEY) {
    return {
      data: {
        name: options.params?.q || '',
        main: { temp: null, feels_like: null },
        weather: [{ description: 'Weather unavailable', main: '' }],
      },
    };
  }
  return axios.get(url, { timeout: 5000, ...options });
}

module.exports = { getWeatherResponse };
