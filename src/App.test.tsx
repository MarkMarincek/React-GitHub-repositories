import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import App from './App';

test('renders Git Repositories', () => {
  const observe = jest.fn();

  // @ts-ignore
  window.IntersectionObserver = jest.fn(function () {
    // @ts-ignore
    this.observe = observe;
  });

  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <App />
    </MockedProvider>
  );
  const title = screen.getByText(/Git Repositories/i);
  expect(title).toBeInTheDocument();
});
