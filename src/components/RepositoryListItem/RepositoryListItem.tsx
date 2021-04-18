import React from 'react';
import { List } from 'antd';
import { Repository } from 'models/interfaces';

interface RepositoryListItemProps {
  repository: Repository;
}

export default function RepositoryListItem({ repository }: RepositoryListItemProps) {
  return <List.Item>{repository.name}</List.Item>;
}
