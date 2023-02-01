import { queryKeys } from "definitions";
import { GraphQLClient, gql } from "graphql-request";
import { CurrentUserType } from "interfaces";
import { queryClient } from "utils";

const GRAPHQL_ENDPOINT = "http://localhost:3001/graphql/";

const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT);

const SIGNUP_QUERY = gql`
  mutation signup($input: signupInput!) {
    signup(signupInput: $input) {
      id
      fullname
      email
      access_token
      refresh_token
    }
  }
`;

const LOGIN_QUERY = gql`
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

const CREATE_NOTE_QUERY = gql`
  mutation createNote($input: noteInput!) {
    createNote(noteInput: $input) {
      id
      title
      content
      createdAt
    }
  }
`;

const GET_NOTES_QUERY = gql`
  query getNotes {
    getNotes {
      id
      title
      content
      createdAt
    }
  }
`;

const UPDATE_NOTE_QUERY = gql`
  mutation updateNote($input: noteInput!) {
    updateNote(noteInput: $input) {
      id
      title
      content
      createdAt
    }
  }
`;

const REFRESH_TOKEN_QUERY = gql`
  query refreshToken {
    refreshToken {
      access_token
      refresh_token
    }
  }
`;

const queryHandler = (query: string, variables?: any) => {
  const user = queryClient.getQueryData<CurrentUserType>(queryKeys.auth);

  if (user?.access_token) {
    graphQLClient.setHeaders({
      authorization: `Bearer ${user.access_token}`,
      anotherheader: "authorization",
    });
  }

  if (query === REFRESH_TOKEN_QUERY && user?.refresh_token) {
    graphQLClient.setHeaders({
      authorization: `Bearer ${user.refresh_token}`,
      anotherheader: "authorization",
    });
  }
  return graphQLClient.request(query, variables);
};

export {
  graphQLClient,
  SIGNUP_QUERY,
  LOGIN_QUERY,
  CREATE_NOTE_QUERY,
  GET_NOTES_QUERY,
  UPDATE_NOTE_QUERY,
  REFRESH_TOKEN_QUERY,
  queryHandler,
};
