import { gql } from "@apollo/client";

const GET_NOTES_QUERY = gql`
  query getNotes {
    getNotes {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

const SELECT_NOTE_QUERY = gql`
  query selectNote {
    selectNote {
      id
      title
      content
      createdAt
      updatedAt
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

const USER_QUERY = gql`
  query user {
    user {
      id
      fullname
      email
      access_token
      refresh_token
    }
  }
`;

export { GET_NOTES_QUERY, REFRESH_TOKEN_QUERY, USER_QUERY, SELECT_NOTE_QUERY };
