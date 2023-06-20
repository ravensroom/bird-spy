import axios from 'axios';
import cheerio from 'cheerio';
export default async function getParsedHTML(url) {
    try {
        const response = await axios.get(url);
        return cheerio.load(response.data);
    }
    catch (e) {
        return new Error(e);
    }
}
