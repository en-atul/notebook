import classNames from "classnames";
import { queryKeys } from "definitions";
import { CurrentUserType, NoteType } from "interfaces";
import { useQuery } from "react-query";
import { queryHandler, GET_NOTES_QUERY, REFRESH_TOKEN_QUERY } from "services";
import { queryClient } from "utils";
//@ts-ignore
import ContextMenu from "@agjs/react-right-click-menu";
import { useRef, useState } from "react";

const ActionPopup = ({ showLogout }: { showLogout: boolean }) => (
  <div
    style={{ margin: 0, padding: 0 }}
    className="w-40 rounded-md border bg-white shadow-md overflow-hidden"
  >
    <ul className="text-sm">
      <li className="h-10 p-3 hover:bg-gray-100">New Note</li>

      {showLogout ? (
        <li className="h-10 p-3 hover:bg-gray-100">Logout</li>
      ) : (
        <>
          <li className="h-10 p-3 hover:bg-gray-100">Duplicate Note</li>
          <li className="h-10 p-3 hover:bg-gray-100">Delete Note</li>
        </>
      )}
    </ul>
  </div>
);

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
    console.log("chgcjh");
    setShowLogout(!showLogout);
  };

  console.log("logg", showLogout);
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
          notes.map((note, idx) => (
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
                <p className="capitalize font-medium">{note.title}</p>
                <p className="capitalize text-xs font-light text-gray-500 mt-2">
                  {note.content}
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
        component={<ActionPopup showLogout={showLogout} />}
        isOpen={isMenuShown}
        setIsOpen={(v: boolean) => {
          setIsMenuShown(v);
          toggleLogoutVisibility();
        }}
      />
    </section>
  );
}
