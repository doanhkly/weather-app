import { useState, useEffect } from 'react'

const axios = require('axios')

export const useFetchWeather = (url, city) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(url, { data: { city: city }})
                if (response.cod === 404) {
                    setError(true)
                }
                const data = {
                    temp: response.main.temp,
                    city: response.name,
                    country: response.sys.country, 
                    weather: res.weather
                }
                setData(data)
            } catch (error) {
                setError(true)
                console.log(error)
            }

        }
    }, [ city ])
    return { data, error }
}