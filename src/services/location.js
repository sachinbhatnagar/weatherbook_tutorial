import axios from "axios";
export default function(text) {
  return new Promise(async (resolve, reject) => {
    try {
      const getLocationData = await axios.get(
        "https://api.apixu.com/v1/search.json",
        {
          params: {
            key: process.env.VUE_APP_KEY,
            q: text
          }
        }
      );

      resolve(getLocationData.data);
    } catch (error) {
      reject(error);
    }
  });
}
