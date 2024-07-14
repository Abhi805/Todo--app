import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import cloud_icon from "../assets/cloud.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import clear_icon from "../assets/clear.png";


const Weather = () => {
   
   const inputRef = useRef();
  const [weatherData,setWeatherData] = useState(false);

const allIcon ={
  "01d":clear_icon,
  "01n":clear_icon,
  "02d":cloud_icon
}

  const search = async (city)=>{
    if(city === ""){
      alert("please enter city name");
      return;
    }
  try{
        
        const url = `https:newsapi.org/v2/everything?q=tesla&from=2024-06-14&sortBy=publishedAt&apiKey=819caf4ffd0f4cc48cd5911763a72d36`;
        const response = await fetch(url);
       
        const data = await response.json();
        if(data){
          alert( "wrong address");
          return;
        }
        console.log(data);
        const icon = allIcon[data.Weather[0].icon] || clear_icon;
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location:data.name,
          icon:icon,
        });
  } catch (error) {
         setWeatherData(false);
         console.error("error in fetching weather data")
  }
  }

  useEffect (()=>{
    search('new york');
  },[])
  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="search here" />
        <img src={weatherData.icon} alt="icon image" onClick={()=>search(inputRef.current.value)} />
      </div>
      {weatherData?<>
      <img src={clear_icon} alt="weather-icon" className="weather-icon" />
      <p className="temperature">{weatherData.temperature}  c</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="humidity-icon" />
          <div>
            <p>{weatherData.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="humidity-icon" />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
      </> :<>data is note avalable</>}
    </div>
  );
};

export default Weather;
