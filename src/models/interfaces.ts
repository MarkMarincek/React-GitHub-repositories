export interface Search<T> {
  nodes?: T[];
  pageInfo: PageInfo;
  repositoryCount?: number;
}

export interface PageInfo {
  startCursor?: string;
  endCursor?: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Repository {
  id: string;
  name: string;
  stargazerCount: number;
  forkCount: number;
  url: string;
}
