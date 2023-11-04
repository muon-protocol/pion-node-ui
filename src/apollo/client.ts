import { ApolloClient, InMemoryCache } from '@apollo/client';
import strings from '../constants/strings.ts';

export const aliceClient = new ApolloClient({
  uri: strings.projectSubgraphAddress,
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
});
