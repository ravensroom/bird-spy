import { PriorityList } from '../../types.js';

export default function getPriorityPoints(
  priorityList: PriorityList,
  description: string
) {
  const priorityMap = new Map();
  const descriptionWords = description.toLowerCase().split(/[\s(),.;\-|\/]+/);
  let priorityPoints = 0;
  for (const word of descriptionWords) {
    if (word in priorityList) {
      priorityPoints += priorityList[word];
      if (!priorityMap.has(word)) priorityMap.set(word, priorityList[word]);
      else {
        priorityMap.set(word, priorityMap.get(word) + priorityList[word]);
      }
    }
  }
  const priorityHits: string[] = [];
  for (const [keyword, points] of priorityMap) {
    if (priorityList[keyword] === 0) {
      priorityHits.push(`${keyword}:0`);
      continue;
    }
    const times = points / priorityList[keyword];
    priorityHits.push(
      `${keyword}:${priorityList[keyword]}${times > 1 ? `*${times}` : ''}`
    );
  }
  return { priorityPoints, priorityHits };
}
