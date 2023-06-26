import axios from 'axios';
import cheerio from 'cheerio';

let retryCount = 0;

axios.interceptors.response.use(
  (response) => {
    retryCount = 0;
    return response;
  },
  (error) => {
    if (error.response.status === 429) {
      // If the error has status code 429, retry the request
      const delay = Math.pow(2, retryCount) * 1000;
      console.log(
        `Responded with 429. Waiting for ${delay} ms before retrying...`
      );
      retryCount++;
      return new Promise((resolve) => setTimeout(resolve, delay)).then(() =>
        axios.request(error.config)
      );
    }
    return Promise.reject(error);
  }
);

export default async function getParsedHTML(url: string) {
  try {
    const response = await axios.get(url);
    return cheerio.load(response.data);
  } catch (e: any) {
    return new Error(e);
  }
}
