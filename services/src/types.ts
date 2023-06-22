export interface Job {
  id: string;
  title: string;
  company: string;
  href: string;
  location: string;
  priority?: number;
  description?: string;
}

export interface Config {
  searchOptions: {
    location: string;
    timeRange: 'by day' | 'by week';
    listOfSearchKeywords: string[];
  };
  rules: {
    titleShouldInclude: string[];
    titleShouldExclude: string[];
    priorityList: { [key: string]: number };
  };
}
