import { useSubscription } from "@apollo/client";
import { NoteType } from "interfaces";
import {
  GET_NOTES_QUERY,
  NOTE_CREATED_SUBSCRIPTION,
  NOTE_DELETED_SUBSCRIPTION,
  NOTE_UPDATED_SUBSCRIPTION,
} from "services";
import { client } from "utils";

export function useAllSubscriptions() {
  const { data: createdNoteData, loading: createNoteLoading } =
    useSubscription<{
      noteCreated: NoteType;
    }>(NOTE_CREATED_SUBSCRIPTION);

  const { data: updatedNoteData, loading: updateNoteLoading } =
    useSubscription<{
      noteUpdated: NoteType;
    }>(NOTE_UPDATED_SUBSCRIPTION);

  const { data: deletedNoteData, loading: deleteNoteLoading } =
    useSubscription<{
      noteDeleted: NoteType;
    }>(NOTE_DELETED_SUBSCRIPTION);

  //create
  if (createdNoteData?.noteCreated && createNoteLoading === false) {
    const allNotes = client.cache.readQuery<{ getNotes: NoteType[] }>({
      query: GET_NOTES_QUERY,
    });
    const areNotesExists =
      allNotes?.getNotes &&
      Array.isArray(allNotes?.getNotes) &&
      allNotes?.getNotes.length > 0;
    const isNoteExists = areNotesExists
      ? allNotes.getNotes.some(
          (note) => note.id === createdNoteData.noteCreated.id
        )
      : false;

    if (isNoteExists === false) {
      const newNotes = [
        createdNoteData?.noteCreated,
        ...(areNotesExists ? allNotes.getNotes : []),
      ];

      client.cache.writeQuery({
        query: GET_NOTES_QUERY,
        data: {
          getNotes: newNotes,
        },
      });
    }
  }

  //update
  if (updatedNoteData?.noteUpdated && updateNoteLoading === false) {
    const allNotes = client.cache.readQuery<{ getNotes: NoteType[] }>({
      query: GET_NOTES_QUERY,
    });
    const areNotesExists =
      allNotes?.getNotes &&
      Array.isArray(allNotes?.getNotes) &&
      allNotes?.getNotes.length > 0;

    const idx = allNotes?.getNotes.findIndex(
      (note) => note.id === updatedNoteData.noteUpdated.id
    );

    if (typeof idx === "number" && idx >= 0 && areNotesExists) {
      const cpyNotes = [...allNotes.getNotes];
      cpyNotes[idx] = updatedNoteData?.noteUpdated;

      client.cache.writeQuery({
        query: GET_NOTES_QUERY,
        data: {
          getNotes: cpyNotes,
        },
      });
    }
  }

  //delete
  if (deletedNoteData?.noteDeleted && deleteNoteLoading === false) {
    const allNotes = client.cache.readQuery<{ getNotes: NoteType[] }>({
      query: GET_NOTES_QUERY,
    });
    const areNotesExists =
      allNotes?.getNotes &&
      Array.isArray(allNotes?.getNotes) &&
      allNotes?.getNotes.length > 0;

    const idx = allNotes?.getNotes.findIndex(
      (note) => note.id === deletedNoteData.noteDeleted.id
    );

    if (typeof idx === "number" && idx >= 0 && areNotesExists) {
      const cpyNotes = [...allNotes.getNotes];
      cpyNotes.splice(idx, 1);

      client.cache.writeQuery({
        query: GET_NOTES_QUERY,
        data: {
          getNotes: cpyNotes,
        },
      });
    }
  }

  return {};
}
