import React, { RefObject, useState } from 'react';
import { Repository } from 'models/interfaces';
import { useQuery } from '@apollo/client';
import RepositoryListItem from 'components/RepositoryListItem';
import { List, Divider, Spin, Input } from 'antd';
import './App.css';
import {
  SearchGitRepositoriesResponse,
  SearchGitRepositoriesVars,
  SEARCH_GIT_REPOSITORIES,
} from 'utils/graph-ql';
import { PAGINATION_ITEMS_PER_PAGE } from 'config';
import { useOnIntersectionChange } from 'utils/hooks';

function renderListItem(repository: Repository) {
  return <RepositoryListItem repository={repository} />;
}

function rowKey(repo: Repository) {
  return repo.id;
}

function App() {
  const [query, setQuery] = useState('React');
  const { data, loading, fetchMore } = useQuery<
    SearchGitRepositoriesResponse,
    SearchGitRepositoriesVars
  >(SEARCH_GIT_REPOSITORIES, {
    variables: { query, last: PAGINATION_ITEMS_PER_PAGE },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });
  const { ref: intersectionRef } = useOnIntersectionChange(onBottomIntersectionChange, '200px');

  function onBottomIntersectionChange(intersecting: boolean) {
    if (!intersecting || loading || !data?.search.pageInfo.hasNextPage || false) return;
    fetchMore({ variables: { after: data.search.pageInfo.endCursor } });
  }

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.currentTarget.value);
  }

  const repositories = data?.search.nodes;

  return (
    <>
      <Divider>Git Repositories</Divider>
      <div className="input__wrapper">
        <Input size="large" value={query} onChange={onInputChange} />
      </div>
      {repositories && (
        <List rowKey={rowKey} bordered dataSource={repositories} renderItem={renderListItem} />
      )}
      <div ref={intersectionRef as RefObject<HTMLDivElement>} />
      <div className="spin__wrapper">{loading && <Spin size="large" />}</div>
    </>
  );
}

export default App;
