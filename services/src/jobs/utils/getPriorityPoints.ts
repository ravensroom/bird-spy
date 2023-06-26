import { PriorityList } from '../../types.js';

export default function getPriorityPoints(
  priorityList: PriorityList,
  description: string
) {
  const priorityHits = [];
  const text = description.toLowerCase();
  let priorityPoints = 0;
  for (const keyword in priorityList) {
    if (text.indexOf(keyword) > 0) {
      priorityPoints += priorityList[keyword];
      priorityHits.push(`${keyword}:${priorityList[keyword]}`);
    }
  }
  return { priorityPoints, priorityHits };
}
