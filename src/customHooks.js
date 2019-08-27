import { useState, useEffect } from "react";
const axios = require('axios')

export const useFetchWeather = (url, city) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await axios.post(url, { city: city })
        const data = res.data
        //console.log(res.data)
        const arr = {
          temp: data.main.temp.toFixed(0),
          city: data.name,
          country: data.sys.country,
          weather: data.weather
        }
        setData(arr)
        setError(false)
        setLoading(false)
      } catch (err) {
        //console.log(err)
        setError(true);
        setLoading(false);
      } 
    }
    fetchData();
  }, [city]);
  return { data, error, loading };
};