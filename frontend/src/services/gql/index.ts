import { gql } from "@apollo/client";

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
      updatedAt
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
      updatedAt
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

export {
  SIGNUP_QUERY,
  LOGIN_QUERY,
  CREATE_NOTE_QUERY,
  GET_NOTES_QUERY,
  UPDATE_NOTE_QUERY,
  REFRESH_TOKEN_QUERY,
  USER_QUERY,
  SELECT_NOTE_QUERY,
};
