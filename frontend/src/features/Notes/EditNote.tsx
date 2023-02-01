import { queryKeys } from "definitions";
import { NoteType } from "interfaces";
import { useMutation, useQuery } from "react-query";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import { queryHandler, UPDATE_NOTE_QUERY } from "services";
import { queryClient } from "utils";

export function CreateEditNote() {
  const [value, setValue] = useState<NoteType>();
  const { data: selectedNote } = useQuery<NoteType>(queryKeys.selectedNote);

  const queryVariables = {
    input: {
      id: selectedNote?.id,
      title: value?.title,
      content: value?.content,
    },
  };

  const { mutate } = useMutation(
    async () => queryHandler(UPDATE_NOTE_QUERY, queryVariables),
    {
      onMutate: async (updatedData: NoteType) => {
        const previousNotes = queryClient.getQueryData<NoteType[]>(
          queryKeys.notes
        );
        if (Array.isArray(previousNotes) && previousNotes.length) {
          const copyNotes = [...previousNotes];
          const idx = copyNotes.findIndex((n) => n.id === updatedData.id);
          copyNotes[idx] = {
            ...copyNotes[idx],
            ...updatedData,
          };
          queryClient.setQueryData(queryKeys.notes, () => copyNotes);
        }
        return { previousNotes };
      },
      onSuccess: (data) => {
        if (data?.updateNote) {
          queryClient.setQueryData(queryKeys.selectedNote, data.updateNote);
        }
      },
      onError: (err: any) => {
        const errMessage = err?.response?.errors[0]?.message;
        console.log(errMessage);
      },
    }
  );

  const autoSave = debounce((e) => {
    const payload = { ...value, [e.target.name]: e.target.value };
    mutate(payload as any);
  }, 1000);

  useEffect(() => {
    if (selectedNote) setValue(selectedNote);
  }, [selectedNote]);

  return selectedNote?.id ? (
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
        className="focus:outline-none p-4 bg-transparent"
      />
    </section>
  ) : null;
}
