import React, { RefObject } from 'react';
import { Repository } from 'models/interfaces';
import { useQuery } from '@apollo/client';
import RepositoryListItem from 'components/RepositoryListItem';
import { List, Divider, Spin } from 'antd';
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
  const { data, loading, fetchMore } = useQuery<
    SearchGitRepositoriesResponse,
    SearchGitRepositoriesVars
  >(SEARCH_GIT_REPOSITORIES, {
    variables: { query: 'React', last: PAGINATION_ITEMS_PER_PAGE },
    notifyOnNetworkStatusChange: true,
  });
  const { ref: intersectionRef } = useOnIntersectionChange(onBottomIntersectionChange, '200px');

  function onBottomIntersectionChange(intersecting: boolean) {
    if (!intersecting || loading || !data?.search.pageInfo.hasNextPage || false) return;
    fetchMore({ variables: { after: data.search.pageInfo.endCursor } });
  }

  const repositories = data?.search.nodes;

  return (
    <>
      <Divider>Header</Divider>
      {repositories && (
        <List rowKey={rowKey} bordered dataSource={repositories} renderItem={renderListItem} />
      )}
      <div ref={intersectionRef as RefObject<HTMLDivElement>} />
      <div className="spin__wrapper">{loading && <Spin size="large" />}</div>
    </>
  );
}

export default App;
