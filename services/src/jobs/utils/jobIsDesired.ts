export function jobIsDesired(
  titleIncludes: string[],
  titleExcludes: string[],
  title: string
): boolean {
  const titleWords = title.split(/[\s(),.;\-|\/]+/);
  let isDesired = false;

  for (let word of titleWords) {
    word = word.toLowerCase();
    if (titleExcludes.includes(word)) return false;
    if (titleIncludes.includes(word)) isDesired = true;
  }
  return isDesired;
}
