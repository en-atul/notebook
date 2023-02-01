import { queryKeys } from "definitions";
import { GraphQLClient, gql } from "graphql-request";
import { CurrentUserType } from "interfaces";
import { queryClient } from "utils";

const GRAPHQL_ENDPOINT = "http://localhost:3001/graphql/";

const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT);

const loginQuery = gql`
  mutation login($input: loginInput!) {
    login(loginInput: $input) {
      id
      fullname
      email
      access_token
      refresh_token
    }
  }
`;

const getNotesQuery = gql`
  query getNotes {
    getNotes {
      id
      title
      content
      createdAt
    }
  }
`;

const queryHandler = (query: string, variables?: any) => {
  const access_token = queryClient.getQueryData<CurrentUserType>(
    queryKeys.auth
  )?.access_token;

  if (access_token) {
    graphQLClient.setHeaders({
      authorization: `Bearer ${access_token}`,
      anotherheader: "authorization",
    });
  }
  return variables
    ? graphQLClient.request(query, variables)
    : graphQLClient.request(query);
};

export { graphQLClient, loginQuery, getNotesQuery, queryHandler };
