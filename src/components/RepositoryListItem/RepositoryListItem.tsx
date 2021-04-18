import React from 'react';
import { List } from 'antd';
import { Repository } from 'models/interfaces';

interface RepositoryListItemProps {
  repository: Repository;
}

export default function RepositoryListItem({ repository }: RepositoryListItemProps) {
  const { name, stargazerCount, forkCount } = repository;
  return (
    <List.Item>
      {name} - 🌟 {stargazerCount} - 🍴 {forkCount}
    </List.Item>
  );
}
