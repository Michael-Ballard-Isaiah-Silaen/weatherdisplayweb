export default async function handler(request, response) {
    const API_KEY = process.env.API_KEY; 
    const CITY = process.env.VITE_CITY;
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`;
    try{
      const apiResponse = await fetch(API_URL);
      if (!apiResponse.ok){
        throw new Error(`Weather API failed with status: ${apiResponse.status}`);
      }
      const data = await apiResponse.json();
      response.status(200).json(data);
    } 
    catch(error){
      response.status(500).json({ message: error.message });
    }
  }