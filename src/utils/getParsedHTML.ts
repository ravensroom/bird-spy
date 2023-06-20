import axios from 'axios';
import cheerio from 'cheerio';
import { writeFile } from 'fs/promises';

export default async function getParsedHTML(url: string) {
  try {
    const response = await axios.get(url);
    return cheerio.load(response.data);
  } catch (e: any) {
    return new Error(e);
  }
}
