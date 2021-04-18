import React from 'react';
import { Repository } from 'models/interfaces';
import { useQuery } from '@apollo/client';
import RepositoryListItem from 'components/RepositoryListItem';
import { List, Divider } from 'antd';
import './App.css';
import {
  SearchGitRepositoriesResponse,
  SearchGitRepositoriesVars,
  SEARCH_GIT_REPOSITORIES,
} from 'utils/graph-ql';
import { PAGINATION_ITEMS_PER_PAGE } from 'config';

function renderListItem(repository: Repository) {
  return <RepositoryListItem repository={repository} />;
}

function rowKey(repo: Repository) {
  return repo.id;
}

function App() {
  const { data, loading } = useQuery<SearchGitRepositoriesResponse, SearchGitRepositoriesVars>(
    SEARCH_GIT_REPOSITORIES,
    {
      variables: { query: 'React', last: PAGINATION_ITEMS_PER_PAGE },
    }
  );

  const repositories = data?.search.nodes ?? [];

  return (
    <>
      <Divider>Header</Divider>
      <List
        loading={loading}
        rowKey={rowKey}
        bordered
        dataSource={repositories}
        renderItem={renderListItem}
      />
    </>
  );
}

export default App;
