import { gql } from '@apollo/client';
import { Search, Repository } from 'models/interfaces';

export interface SearchGitRepositoriesVars {
  query: string;
  last: number;
  after?: string;
}

export interface SearchGitRepositoriesResponse {
  search: Search<Repository>;
}

const SEARCH_GIT_REPOSITORIES = gql`
  query Search($query: String!, $last: Int, $after: String) {
    search(type: REPOSITORY, query: $query, last: $last, after: $after) {
      repositoryCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      nodes {
        ... on Repository {
          name
          stargazerCount
          forkCount
          url
          id
        }
      }
    }
  }
`;

// For this short example we just happen to have only one query and this way of exporting
// is not allowed by below rule if we have only one names variable to export.
// Under normal circumstances this would not be relevant.
// eslint-disable-next-line import/prefer-default-export
export { SEARCH_GIT_REPOSITORIES };
