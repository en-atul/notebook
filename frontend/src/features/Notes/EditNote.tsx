import { useMutation, useQuery } from "@apollo/client";
import { NoteType } from "interfaces";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import {
  GET_NOTES_QUERY,
  SELECT_NOTE_QUERY,
  UPDATE_NOTE_MUTATION,
} from "services";

export function CreateEditNote() {
  const [value, setValue] = useState<NoteType>();
  const { data } = useQuery<{ selectNote: NoteType }>(SELECT_NOTE_QUERY, {
    fetchPolicy: "cache-only",
  });

  const [updateNote] = useMutation(UPDATE_NOTE_MUTATION, {
    update(cache, { data }) {
      const notes = cache.readQuery<{ getNotes: NoteType[] }>({
        query: GET_NOTES_QUERY,
      });
      const idx = notes?.getNotes.findIndex((n) => n.id === data.id);
      if (idx !== undefined && idx >= 0) {
        const cpyNotes = [...notes?.getNotes!];
        cpyNotes[idx] = {
          ...cpyNotes[idx],
          ...data.updateNote,
        };

        cache.writeQuery({
          query: GET_NOTES_QUERY,
          data: {
            getNotes: cpyNotes,
          },
        });

        cache.writeQuery({
          query: SELECT_NOTE_QUERY,
          data: {
            selectNote: data.updateNote,
          },
        });
      }
    },
  });

  const autoSave = debounce((e) => {
    const payload = {
      id: value?.id,
      title: value?.title,
      content: value?.content,
      [e.target.name]: e.target.value,
    };

    updateNote({
      variables: { input: payload },
      // optimisticResponse: {
      //   __typnename: "Mutation",
      //   updateNote: {
      //     __typename: "NoteResponse",
      //     id: value?.id,
      //     [e.target.name]: e.target.value,
      //   },
      // },
    });
  }, 1000);

  useEffect(() => {
    if (data?.selectNote) setValue(data?.selectNote);
  }, [data?.selectNote]);

  return data?.selectNote?.id ? (
    <section className="col-span-10 h-full flex flex-col p-10">
      <input
        name="title"
        placeholder="Title"
        value={value?.title}
        onChange={(e) => {
          setValue({ ...value, title: e.target.value } as any);
          autoSave(e);
        }}
        className="text-2xl px-4 focus:outline-none bg-transparent"
      />
      <textarea
        name="content"
        value={value?.content}
        onChange={(e) => {
          setValue({ ...value, content: e.target.value } as any);
          autoSave(e);
        }}
        className="focus:outline-none p-4 bg-transparent resize-none h-full"
      />
    </section>
  ) : null;
}
