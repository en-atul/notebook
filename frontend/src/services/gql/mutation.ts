import { gql } from "@apollo/client";

const SIGNUP_MUTATION = gql`
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

const LOGIN_MUTATION = gql`
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

const CREATE_NOTE_MUTATION = gql`
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

const UPDATE_NOTE_MUTATION = gql`
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

const DELETE_NOTE_MUTATION = gql`
  mutation deleteNote($input: noteInput!) {
    deleteNote(noteInput: $input) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export {
  SIGNUP_MUTATION,
  LOGIN_MUTATION,
  CREATE_NOTE_MUTATION,
  UPDATE_NOTE_MUTATION,
  DELETE_NOTE_MUTATION,
};
