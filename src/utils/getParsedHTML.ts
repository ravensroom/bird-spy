import axios from 'axios';
import cheerio from 'cheerio';

export default async function getParsedHTML(url: string) {
  const response = await axios.get(url);
  const html = response.data;
  return cheerio.load(html);
}
