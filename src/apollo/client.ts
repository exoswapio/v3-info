import { ApolloClient, InMemoryCache } from '@apollo/client'

export const healthClient = new ApolloClient({
  uri: 'https://web3-thegraph-mesos.thestratos.org/index-node/graphql',
  cache: new InMemoryCache(),
})

export const mesosBlockClient = new ApolloClient({
  uri: 'https://web3-thegraph-mesos.thestratos.org/subgraphs/name/exoswap/stratos-blocks',
  cache: new InMemoryCache(),
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})

export const mesosClient = new ApolloClient({
  uri: 'https://web3-thegraph-mesos.thestratos.org/subgraphs/name/exoswap/v3-subgraph',
  cache: new InMemoryCache({
    typePolicies: {
      Token: {
        // Singleton types that have no identifying field can use an empty
        // array for their keyFields.
        keyFields: false,
      },
      Pool: {
        // Singleton types that have no identifying field can use an empty
        // array for their keyFields.
        keyFields: false,
      },
    },
  }),
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})

export const client = mesosClient
