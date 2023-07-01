export function jobIsDesired(
  titleIncludes: string[],
  titleExcludes: string[],
  title: string
): boolean {
  const titleWords = title.toLowerCase().split(/[\s(),.;\-|\/]+/);

  for (let word of titleWords) {
    word = word.toLowerCase();
    if (titleExcludes.includes(word)) return false;
    if (titleIncludes.includes(word) || titleIncludes.length === 0) return true;
  }

  return false;
}
