import getQueryData from './getQueryData.js';

const {
  rules: { titleShouldExclude, titleShouldInclude },
} = getQueryData();

export function jobIsDesired(title: string): boolean {
  const titleWords = title.split(/[\s(),.;\-|\/]+/);
  let isDesired = false;
  for (let word of titleWords) {
    word = word.toLowerCase();
    if (titleShouldExclude.has(word)) return false;
    if (titleShouldInclude.has(word)) isDesired = true;
  }
  return isDesired;
}
