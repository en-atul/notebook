import {
  ApolloClient,
  ApolloQueryResult,
  createHttpLink,
  from,
  fromPromise,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import { REFRESH_TOKEN_QUERY, USER_QUERY } from "services";
import { CurrentUserType } from "interfaces";
import { getMainDefinition } from "@apollo/client/utilities";

const GRAPHQL_ENDPOINT = "http://localhost:3001/graphql/";
const GRAPHQL_WS_ENDPOINT = "ws://localhost:3001/subscriptions";

const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

const cache = new InMemoryCache();
persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
});

function getToken() {
  const data = client.cache.readQuery<{ user: CurrentUserType }>({
    query: USER_QUERY,
  });

  return data?.user;
}

const getNewToken = () => {
  return client.query({ query: REFRESH_TOKEN_QUERY }).then(
    (
      response: ApolloQueryResult<{
        refreshToken: {
          access_token: string;
          refresh_token: string;
        };
      }>
    ) => {
      const data$ = client.cache.readQuery<{ user: CurrentUserType }>({
        query: USER_QUERY,
      });
      client.cache.writeQuery({
        query: USER_QUERY,
        data: {
          user: {
            ...data$?.user,
            access_token: response.data?.refreshToken?.access_token,
            refresh_token: response.data?.refreshToken?.refresh_token,
          },
        },
      });
      // extract your accessToken from your response data and return it
      const { access_token } = response.data?.refreshToken;
      return access_token;
    }
  );
};

/**
 * ------- subscriptions -------
 */
const wsLink = new GraphQLWsLink(
  createClient({
    url: GRAPHQL_WS_ENDPOINT,
    connectionParams: async () => {
      const token = getToken();
      if (token?.access_token) {
        return {
          Authorization: `Bearer ${token.access_token}`,
        };
      }
      return {};
    },
    shouldRetry: () => true,
    retryAttempts: 5,
  })
);

const authLink = setContext((req, { headers }) => {
  const tokens = getToken();

  // return the authorization header for refreshToken query
  if (req.operationName === "refreshToken")
    return {
      headers: {
        ...headers,
        authorization: tokens?.refresh_token
          ? `Bearer ${tokens?.refresh_token}`
          : "",
      },
    };

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: tokens?.access_token
        ? `Bearer ${tokens?.access_token}`
        : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions?.code) {
        case "UNAUTHENTICATED":
          return fromPromise(
            getNewToken().catch(() => {
              client.clearStore();
              client.cache.writeQuery({
                query: USER_QUERY,
                data: { user: null },
              });
              return;
            })
          )
            .filter((value) => Boolean(value))
            .flatMap((accessToken) => {
              const oldHeaders = operation.getContext().headers;
              // modify the operation context with a new token
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${accessToken}`,
                },
              });

              // retry the request, returning the new observable
              return forward(operation);
            });
      }
    }
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

/** ---------- */

const client = new ApolloClient({
  link: from([errorLink, authLink, splitLink]),
  cache,
  connectToDevTools: true,
});

export { GRAPHQL_ENDPOINT, client };
