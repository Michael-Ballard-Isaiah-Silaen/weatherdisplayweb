import { useState, useEffect, FC } from "react";
import SvgBottomLeft from "./SvgBottomLeft";
const API_URL = "/api/weather";

interface WeatherData{
  name:string;
  weather:{
    description:string;
    icon:string;
  }[];
  main:{
    temp: number;
    feels_like:number;
    humidity:number;
  };
  wind:{
    speed:number;
  };
}

const HeroSection: FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchWeatherData = async () => {
      try{
        const response = await fetch(API_URL);
        if(!response.ok){
          throw new Error("Failed to fetch weather data. Please check the city or API key.");
        }
        const data = (await response.json()) as WeatherData;
        setWeatherData(data);
      } 
      catch(err){
        if(err instanceof Error){
            setError(err.message);
        } 
        else{
            setError("An unknown error occurred.");
        }
      } 
      finally{
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, []);

  const renderContent = () => {
    if(loading){
      return <p className="text-xl text-blue-700">Loading weather data...</p>;
    }
    if(error){
      return <p className="text-xl text-red-500">Error: {error}</p>;
    }
    if(weatherData){
      const tempCelsius = (weatherData.main.temp - 273.15).toFixed(1);
      const feelsLikeCelsius = (weatherData.main.feels_like - 273.15).toFixed(1);
      const weatherIcon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
      return(
        <div className="relative w-full max-w-md rounded-xl bg-white/70 p-8 text-center shadow-lg backdrop-blur-sm">
          <h1 className="text-4xl font-bold text-blue-800">{weatherData.name}</h1>
          <h2 className="text-lg capitalize text-gray-600">{weatherData.weather[0].description}</h2>
          <div className="my-6 flex items-center justify-center">
            <img src={weatherIcon} alt={weatherData.weather[0].description} className="h-24 w-24" />
            <p className="text-7xl font-bold text-blue-900">{tempCelsius}°C</p>
          </div>
          <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-3">
            <div className="flex flex-col items-center">
                <span className="font-semibold text-blue-700">Feels Like</span>
                <span className="text-lg text-gray-800">{feelsLikeCelsius}°C</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-semibold text-blue-700">Humidity</span>
                <span className="text-lg text-gray-800">{weatherData.main.humidity}%</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-semibold text-blue-700">Wind</span>
                <span className="text-lg text-gray-800">{weatherData.wind.speed} m/s</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    <section className="relative h-[70vh] min-h-[70vh] w-full">
      <SvgBottomLeft />
      <div className="relative flex h-full w-full flex-col items-center justify-center p-4">
        {renderContent()}
      </div>
    </section>
  );
};

export default HeroSection;