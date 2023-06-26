export type Source = 'linkedin' | 'wellfound';
export type JobBody = {
  title: string;
  company: string;
  href: string;
  location: string;
  priorityPoints: number;
  priorityHits: string[];
  description?: string;
};
export interface Job {
  id: string;
  userId: string;
  source: Source;
  archiveId?: string;
  body: JobBody;
}

export type TimeRange = 'by day' | 'by week';
export type PriorityList = { [key: string]: number };
export type ConfigBody = {
  location: string;
  timeRange: TimeRange;
  listOfSearchKeywords: string[];
  titleIncludes: string[];
  titleExcludes: string[];
  priorityList: PriorityList;
};
export interface Config {
  id: string;
  userId: string;
  name: string;
  body: ConfigBody;
}

export interface User {
  id: string;
}
