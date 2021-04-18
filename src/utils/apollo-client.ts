import { ApolloClient, InMemoryCache } from '@apollo/client';
import { API_URL, GIT_ACCESS_TOKEN } from 'config';
import { Repository, Search } from 'models/interfaces';

export default new ApolloClient({
  uri: API_URL,
  headers: {
    Authorization: `bearer ${GIT_ACCESS_TOKEN}`,
  },
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          search: {
            keyArgs: ['query'],
            merge(
              existing?: Search<Repository>,
              incoming?: Search<Repository>
            ): Search<Repository> | undefined {
              if (!existing) return incoming;
              if (!incoming) return existing;
              return {
                ...incoming,
                nodes: [...(existing?.nodes ?? []), ...(incoming?.nodes ?? [])],
              };
            },
          },
        },
      },
    },
  }),
});
