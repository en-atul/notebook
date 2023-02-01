import classNames from "classnames";
import { queryKeys } from "definitions";
import { CurrentUserType, NoteType } from "interfaces";
import { useMutation, useQuery } from "react-query";
import {
  queryHandler,
  CREATE_NOTE_QUERY,
  GET_NOTES_QUERY,
  REFRESH_TOKEN_QUERY,
} from "services";
import { queryClient } from "utils";
//@ts-ignore
import ContextMenu from "@agjs/react-right-click-menu";
import { useRef, useState } from "react";

const ActionPopup = ({
  showLogout,
  toggleMenu,
}: {
  showLogout: boolean;
  toggleMenu: () => void;
}) => {
  const createNoteVariables = {
    input: {
      title: "",
      content: "",
    },
  };

  const { mutate } = useMutation(
    async () => queryHandler(CREATE_NOTE_QUERY, createNoteVariables),
    {
      onMutate: () => {
        toggleMenu();
      },
      onSuccess: (data) => {
        if (data?.createNote) {
          const previousNotes = queryClient.getQueryData<NoteType[]>(
            queryKeys.notes
          );
          if (Array.isArray(previousNotes) && previousNotes.length)
            queryClient.setQueryData(queryKeys.notes, () => [
              ...previousNotes,
              data.createNote,
            ]);
          else
            queryClient.setQueryData(queryKeys.notes, () => [data.createNote]);

          queryClient.setQueryData(queryKeys.selectedNote, data.createNote);
        }
      },
      onError: (err: any) => {
        const errMessage = err?.response?.errors[0]?.message;
        console.log(errMessage);
      },
    }
  );

  const onLogout = () => queryClient.clear();

  return (
    <div
      style={{ margin: 0, padding: 0 }}
      className="w-40 rounded-md border bg-white shadow-md overflow-hidden"
    >
      <ul className="text-sm">
        <li
          className="h-10 p-3 hover:bg-gray-100"
          role="button"
          onClick={() => mutate()}
        >
          New Note
        </li>

        {showLogout ? (
          <li
            className="h-10 p-3 hover:bg-gray-100"
            role="button"
            onClick={onLogout}
          >
            Logout
          </li>
        ) : (
          <>
            <li className="h-10 p-3 hover:bg-gray-100">Duplicate Note</li>
            <li className="h-10 p-3 hover:bg-gray-100">Delete Note</li>
          </>
        )}
      </ul>
    </div>
  );
};

export function NoteList() {
  const [showLogout, setShowLogout] = useState(true);

  const [isMenuShown, setIsMenuShown] = useState(false);
  const ref = useRef(null);

  const user = queryClient.getQueryData<CurrentUserType>(queryKeys.auth);
  const notes = queryClient.getQueryData<NoteType[]>(queryKeys.notes);
  const { data: selectedNote } = useQuery<NoteType>(queryKeys.selectedNote);

  const { isLoading, isError, refetch } = useQuery(
    queryKeys.notes,
    () => queryHandler(GET_NOTES_QUERY),
    {
      onSuccess: (data) => {
        if (data?.getNotes)
          queryClient.setQueryData(queryKeys.notes, data.getNotes);
      },
      onError: (error: any) => {
        error.response.errors.forEach(async (err: any) => {
          if (err.message.includes("Unauthorized")) {
            try {
              const tokens = await queryHandler(REFRESH_TOKEN_QUERY);
              if (tokens?.refreshToken)
                queryClient.setQueryData(queryKeys.auth, (old: any) => ({
                  ...old,
                  ...tokens.refreshToken,
                }));
              refetch();
            } catch (error) {
              // console.log("errrrr", error);
              queryClient.clear();
            }
          }
        });
      },
    }
  );

  const setCurrentNote = (note: NoteType) => {
    queryClient.setQueryData(queryKeys.selectedNote, note);
  };

  const toggleLogoutVisibility = () => {
    setShowLogout(!showLogout);
  };

  const toggleMenu = () => {
    setIsMenuShown(!isMenuShown);
  };

  return (
    <section className="col-span-2 border-r h-full bg-white" ref={ref}>
      <div
        className="w-full h-20 border-b flex"
        onContextMenu={toggleLogoutVisibility}
      >
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
          notes
            .sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt))
            .map((note, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentNote(note)}
                onContextMenu={() => setCurrentNote(note)}
                className={classNames("my-2", {
                  "bg-violet-50 rounded-md": selectedNote?.id === note.id,
                })}
              >
                <div
                  className={classNames("p-3 cursor-default", {
                    "border-b": selectedNote?.id !== note.id,
                  })}
                >
                  <p className="capitalize font-medium">
                    {note.title || "New Note"}
                  </p>
                  <p className="capitalize text-xs font-light text-gray-500 mt-2">
                    {note.content || "No additional text"}
                  </p>
                </div>
              </div>
            ))
        ) : isLoading ? (
          Array(7)
            .fill({})
            .map((_, idx) => (
              <div
                key={idx}
                className="w-full h-16 mt-3 rounded-sm bg-gray-200 animate-pulse"
              />
            ))
        ) : isError ? (
          <p className="p-5 mx-auto font-light text-gray-600">
            something went wrong!
          </p>
        ) : null}
      </div>

      <ContextMenu
        trigger={ref}
        component={
          <ActionPopup toggleMenu={toggleMenu} showLogout={showLogout} />
        }
        isOpen={isMenuShown}
        setIsOpen={(v: boolean) => {
          setIsMenuShown(v);
          toggleLogoutVisibility();
        }}
      />
    </section>
  );
}
