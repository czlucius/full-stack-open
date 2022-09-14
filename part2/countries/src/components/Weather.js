import {useEffect, useState} from "react";
import axios from "axios";
import {isEmpty} from "../Utils";


function requestAPIKey() {
    const input = prompt("Enter API key for OpenWeatherMap (not found in env)")
    apiKey = input !== null ? input : apiKey
}
let apiKey = process.env.REACT_APP_WEATHER_API
if (apiKey === undefined || apiKey.trim() === "" ) {
    requestAPIKey()
}


export const OpenWeatherInfo = ({city, countryCode}) => {

    while ( apiKey === undefined||apiKey.trim() === "" ) {
        requestAPIKey()
    }

    const [weatherInfo, setWeatherInfo] = useState({})
    console.log("city, country code", city, countryCode)
    const query = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}`
    useEffect(() => {
        axios.get(query).then(response => {
            setWeatherInfo(response.data)
            console.log("weather data", response.data)
        }, () => {
            setWeatherInfo({"rejected": true})
        })
    }, [])

    console.log("weather info", weatherInfo)

    if (weatherInfo.rejected) {
        return <div>Weather info not found.</div>
    }
    else if (isEmpty(weatherInfo)) {
        return <div>Loading weather data...</div>
    } else {
        const icon = weatherInfo.weather[0].icon
        const iconURL = `https://openweathermap.org/img/wn/${icon}.png`
        console.log("iconURL", iconURL)
        return (
            <div>
                <h4>Weather in {city}</h4>
                {/*Temp is given in Kelvins, minus 273 to get celsius*/}
                temperature {(weatherInfo.main.temp - 273).toFixed(1)}
                <br/>
                <img src={iconURL}  alt="Weather icon"/>
                <br/>
                wind {weatherInfo.wind.speed}m/s
            </div>
        )

    }


}