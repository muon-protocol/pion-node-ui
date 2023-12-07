import { ApolloClient, InMemoryCache } from '@apollo/client';
import strings from '../constants/strings.ts';

export const aliceClient = new ApolloClient({
  uri:
    import.meta.env.VITE_APP_CHAIN_ID === '97'
      ? strings.projectTestnetSubgraphAddress
      : strings.projectSubgraphAddress,
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
});
