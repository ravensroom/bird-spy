import cheerio from 'cheerio';
import getQueryData from './getQueryData.js';
import _ from 'lodash';
const { rules: { priority: priorityRules }, } = getQueryData();
async function setPriority(description) {
    const $ = cheerio.load(description);
    const textContent = $.root().text();
    const words = _.words(textContent);
    // console.log(words);
    let priority = 0;
    for (let [key, value] of Object.entries(priorityRules)) {
        if (words.includes(key))
            priority += value;
    }
    return priority;
}
export default setPriority;
