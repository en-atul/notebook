import { queryKeys } from "definitions";
import { CurrentUserType, NoteType } from "interfaces";
import { useQuery, useQueryClient } from "react-query";
import { queryHandler, getNotesQuery } from "services";

export function NoteList() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<CurrentUserType>(queryKeys.auth);
  const notes = queryClient.getQueryData<NoteType>(queryKeys.notes);

  const { isLoading, isError } = useQuery(
    queryKeys.notes,
    () => queryHandler(getNotesQuery),
    {
      onSuccess: (data) => {
        if (data?.getNotes)
          queryClient.setQueryData(queryKeys.notes, data.getNotes);
      },
    }
  );

  return (
    <section className="col-span-2 border-r h-full bg-white">
      <div className="w-full h-20 border-b flex">
        <div className="w-1/4 flex justify-center items-center">
          <div className="uppercase bg-pink-600 bg-opacity-25 w-10 h-10 rounded-full flex justify-center items-center">
            {user?.fullname.charAt(0)}
          </div>
        </div>
        <div className="w-3/4 flex flex-col justify-center">
          <p className="capitalize text-sm">{user?.fullname}</p>
          <p className="text-sm font-light text-gray-500">{user?.email}</p>
        </div>
      </div>
      <div className="w-full h-[calc(100vh_-_80px)] overflow-y-auto px-2">
        {Array.isArray(notes) && notes.length ? (
          notes.map((note, idx) => (
            <div key={idx} className="border-b p-3">
              <p className="capitalize font-medium">{note.title}</p>
              <p className="capitalize text-xs font-light text-gray-500 mt-2">
                {note.content}
              </p>
            </div>
          ))
        ) : isLoading ? (
          Array(7)
            .fill({})
            .map((_, idx) => (
              <div
                key={idx}
                className="w-full h-16 mb-3 rounded-sm bg-gray-200 animate-pulse"
              />
            ))
        ) : isError ? (
          <p className="p-5 mx-auto text-gray-600">something went wrong!</p>
        ) : null}
      </div>
    </section>
  );
}
