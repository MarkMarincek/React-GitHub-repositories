import React from 'react';
import { List } from 'antd';
import { Repository } from 'models/interfaces';
import './RepositoryListItem.style.css';

interface RepositoryListItemProps {
  repository: Repository;
}

export default function RepositoryListItem({ repository }: RepositoryListItemProps) {
  const { name, stargazerCount, forkCount, url } = repository;
  return (
    <List.Item>
      <a href={url} className="list__item">
        {name} - 🌟 {stargazerCount} - 🍴 {forkCount}
      </a>
    </List.Item>
  );
}
