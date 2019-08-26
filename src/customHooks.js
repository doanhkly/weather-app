import { useState, useEffect } from 'react'

const axios = require('axios')

export const useFetchWeather = (url, cityName) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetch(url, {
            method: "POST",
            body: JSON.stringify({ city: cityName })
          })
            .then(r => 
                r.json())
            .then(res => {
              if (res.cod === 404) {
                setError(true);
              }
              console.log(res)
              return res;
            })
            .then(res => {
              const data = {
                temp: res.main.temp.toFixed(0),
                city: res.name,
                country: res.sys.country,
                weather: res.weather
              };
              setData(data);
              setError(false);
            })
            .catch(err => {
              setError(true);
            });
        }, [cityName]);
        return { data, error };
}