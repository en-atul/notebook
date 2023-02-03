import {
  ApolloClient,
  ApolloQueryResult,
  createHttpLink,
  from,
  fromPromise,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";
import { onError } from "@apollo/client/link/error";
import { REFRESH_TOKEN_QUERY, USER_QUERY } from "services";
import { CurrentUserType } from "interfaces";

const GRAPHQL_ENDPOINT = "http://localhost:3001/graphql/";

const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

const authLink = setContext((req, { headers }) => {
  const data = client.cache.readQuery<{ user: CurrentUserType }>({
    query: USER_QUERY,
  });

  // return the authorization header for refreshToken query
  if (req.operationName === "refreshToken")
    return {
      headers: {
        ...headers,
        authorization: data?.user.refresh_token
          ? `Bearer ${data?.user.refresh_token}`
          : "",
      },
    };

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: data?.user.access_token
        ? `Bearer ${data?.user.access_token}`
        : "",
    },
  };
});

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

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case "UNAUTHENTICATED":
          return fromPromise(
            getNewToken().catch((error) => {
              // Handle token refresh errors e.g clear stored tokens, redirect to login
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

const cache = new InMemoryCache();
persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache,
});

export { GRAPHQL_ENDPOINT, client };
