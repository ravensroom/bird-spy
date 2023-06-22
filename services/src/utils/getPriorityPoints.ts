import getQueryData from './getQueryData.js';

const {
  rules: { priorityList },
} = getQueryData();

const priorityRules: PriorityRules = priorityList;

interface PriorityRules {
  [key: string]: number;
}

export default function getPriorityPoints(description: string) {
  const text = description.toLowerCase();
  let priority = 0;
  for (const keyword in priorityRules) {
    if (text.indexOf(keyword) > 0) {
      priority += priorityRules[keyword];
    }
  }
  return priority;
}
