import axios from "axios";

const format = data => {
  const { name, country, localtime } = data.location;
  const { condition, temp_c, is_day } = data.current;
  return {
    place: `${name}, ${country}`,
    localtime,
    temperature: temp_c,
    condition: condition.text,
    icon: condition.icon,
    isDay: is_day,
    forecast: data.forecast.forecastday.map(day => {
      return {
        date: day.date,
        condition: day.day.condition.text,
        icon: day.day.condition.icon,
        maxTemp: day.day.maxtemp_c,
        minTemp: day.day.mintemp_c
      };
    })
  };
};

export default function(location) {
  return new Promise(async (resolve, reject) => {
    try {
      const getWeather = await axios.get(
        "https://api.apixu.com/v1/forecast.json",
        {
          params: {
            key: process.env.VUE_APP_KEY,
            q: location,
            days: 7
          }
        }
      );
      resolve(format(getWeather.data));
    } catch (error) {
      reject(error);
    }
  });
}
