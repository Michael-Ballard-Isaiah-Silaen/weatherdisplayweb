import FeatureBox from "../../components/HomePage/FeatureBox";
import { FaLocationDot } from "react-icons/fa6";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { BsSunrise } from "react-icons/bs";
import { PiIdentificationBadge } from "react-icons/pi";
import { GiWatch } from "react-icons/gi";
import { useEffect, useState } from "react";
const API_URL = "/api/weather";

interface Coord{
  lon: number;
  lat: number;
}
interface Weather{
  id: number;
  main: string;
  description: string;
  icon: string;
}
interface Main{
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}
interface Wind{
  speed: number;
  deg: number;
  gust: number;
}
interface Clouds{
  all: number;
}
interface Sys{
  country: string;
  sunrise: number;
  sunset: number;
}
interface WeatherData2{
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

const FeaturesSection = () => {
  const [weatherData2, setWeatherData2] = useState<WeatherData2 | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try{
        const response = await fetch(API_URL);
        if(!response.ok){
          throw new Error("Failed to fetch weather data. Please check the city or API key.");
        }
        const data = (await response.json()) as WeatherData2;
        setWeatherData2(data);
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

  const toCelsius = (k: number) => (k - 273.15).toFixed(1);
  const formatTime = (unix: number, timezone: number) => {
    const date = new Date((unix + timezone) * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
  };

  const renderContent = () => {
    if(loading){
      return <p className="text-xl text-blue-700">Loading weather details...</p>;
    }
    if(error){
      return <p className="text-xl text-red-500 text-center">Error: {error}</p>;
    }
    if(weatherData2){
      return (
        <>
          <FeatureBox>
            <div className="ml-1 rounded-lg bg-[#eaedfb] p-2">
              <FaLocationDot size={30} color="#4a6cf7" />
            </div>
            <h3 className="text-left text-2xl font-bold text-[#252a35]">
              Lat & Long
            </h3>
            <p className="text-start text-[#8890a0]">
              Latitude: {weatherData2.coord.lat}°
              <br/>
              Longitude: {weatherData2.coord.lon}°
            </p>
          </FeatureBox>
          <FeatureBox>
            <div className="ml-1 rounded-lg bg-[#eaedfb] p-2">
              <FaTemperatureHigh size={30} color="#4a6cf7" />
            </div>
            <h3 className="text-left text-2xl font-bold text-[#252a35]">
              Temperature
            </h3>
            <p className="text-start text-[#8890a0]">
              Min Temp: {toCelsius(weatherData2.main.temp_min)}°C
              <br/>
              Max Temp: {toCelsius(weatherData2.main.temp_max)}°C
              <br/>
              Ground Level: {weatherData2.main.grnd_level} hPa
              <br/>
              Sea Level: {weatherData2.main.sea_level} hPa
            </p>
          </FeatureBox>
          <FeatureBox>
            <div className="ml-1 rounded-lg bg-[#eaedfb] p-2">
              <FaWind size={30} color="#4a6cf7" />
            </div>
            <h3 className="text-left text-2xl font-bold text-[#252a35]">
              Wind
            </h3>
            <p className="text-start text-[#8890a0]">
              Speed: {weatherData2.wind.speed} m/s
              <br/>
              Direction: {weatherData2.wind.deg}°
              <br/>
              Gust: {weatherData2.wind.gust} m/s
            </p>
          </FeatureBox>
          <FeatureBox>
            <div className="ml-1 rounded-lg bg-[#eaedfb] p-2">
              <TiWeatherPartlySunny size={30} color="#4a6cf7" />
            </div>
            <h3 className="text-left text-2xl font-bold text-[#252a35]">
              Atmosphere
            </h3>
            <p className="text-start text-[#8890a0]">
              Visibility: {(weatherData2.visibility / 1000).toFixed(1)} km
              <br/>
              Cloudiness: {weatherData2.clouds.all}%
            </p>
          </FeatureBox>
          <FeatureBox>
            <div className="ml-1 rounded-lg bg-[#eaedfb] p-2">
              <BsSunrise size={30} color="#4a6cf7" />
            </div>
            <h3 className="text-left text-2xl font-bold text-[#252a35]">
              Sunrise & Sunset
            </h3>
            <p className="text-start text-[#8890a0]">
              Sunrise: {formatTime(weatherData2.sys.sunrise, weatherData2.timezone)}
              <br/>
              Sunset: {formatTime(weatherData2.sys.sunset, weatherData2.timezone)}
            </p>
          </FeatureBox>
          <FeatureBox>
            <div className="ml-1 rounded-lg bg-[#eaedfb] p-2">
              <GiWatch size={30} color="#4a6cf7" />
            </div>
            <h3 className="text-left text-2xl font-bold text-[#252a35]">
              Data Timestamp
            </h3>
            <p className="text-start text-[#8890a0]">
              Recorded at: {new Date(weatherData2.dt * 1000).toLocaleTimeString()}
              <br/>
              Timezone: UTC+{weatherData2.timezone / 3600} hours
            </p>
          </FeatureBox>
          <FeatureBox>
            <div className="ml-1 rounded-lg bg-[#eaedfb] p-2">
              <PiIdentificationBadge size={30} color="#4a6cf7" />
            </div>
            <h3 className="text-left text-2xl font-bold text-[#252a35]">
              Weather ID
            </h3>
            <p className="text-start text-[#8890a0]">
              City ID: {weatherData2.id}
              <br />
              Weather Condition ID: {weatherData2.weather[0].id}
            </p>
          </FeatureBox>
        </>
      );
    }
    return null;
  };

  return (
    <section
      id="features"
      className="pn-10 mx-auto flex h-fit w-full max-w-[1200px] flex-col items-center justify-center px-4 pt-20"
    >
      <h2 className="text-3xl font-bold tracking-wide text-blue-700">
        Detailed Information for {weatherData2?.name}
      </h2>
      <div className="flex w-full flex-wrap justify-center gap-4 py-4">
        {renderContent()}
      </div>
    </section>
  );
};

export default FeaturesSection;
