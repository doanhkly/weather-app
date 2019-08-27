require("dotenv").config();

const axios = require('axios')
const API_KEY = process.env.API_KEY;

exports.handler = async (event, context) => {
  const city = JSON.parse(event.body).city
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`;

  try {
    const response = await axios.get(url)
    return {
      statusCode: 200,
      body: JSON.stringify( response.data )
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 422,
      body: JSON.stringify({ error: err.message })
    }
  }
}