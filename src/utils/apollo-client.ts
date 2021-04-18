import { ApolloClient, InMemoryCache } from '@apollo/client';
import { API_URL, GIT_ACCESS_TOKEN } from 'config';

export default new ApolloClient({
  uri: API_URL,
  headers: {
    Authorization: `bearer ${GIT_ACCESS_TOKEN}`,
  },
  cache: new InMemoryCache(),
});
