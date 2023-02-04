import { gql } from "@apollo/client";

const NOTE_CREATED_SUBSCRIPTION = gql`
  subscription {
    noteCreated {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

const NOTE_UPDATED_SUBSCRIPTION = gql`
  subscription {
    noteUpdated {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

const NOTE_DELETED_SUBSCRIPTION = gql`
  subscription {
    noteDeleted {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export {
  NOTE_CREATED_SUBSCRIPTION,
  NOTE_UPDATED_SUBSCRIPTION,
  NOTE_DELETED_SUBSCRIPTION,
};
