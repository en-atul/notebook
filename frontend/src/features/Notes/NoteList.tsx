import classNames from "classnames";
import { CurrentUserType, NoteType } from "interfaces";
import {
  CREATE_NOTE_QUERY,
  GET_NOTES_QUERY,
  USER_QUERY,
  SELECT_NOTE_QUERY,
} from "services";
//@ts-ignore
import ContextMenu from "@agjs/react-right-click-menu";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { client } from "utils";

const ActionPopup = ({
  showLogout,
  toggleMenu,
}: {
  showLogout: boolean;
  toggleMenu: () => void;
}) => {
  const navigate = useNavigate();
  const createNoteVariables = {
    input: {
      title: "",
      content: "",
    },
  };

  const [createNote] = useMutation(CREATE_NOTE_QUERY, {
    update(cache, { data }) {
      const notes = cache.readQuery<{ getNotes: NoteType[] }>({
        query: GET_NOTES_QUERY,
      });

      const res = data!.createNote;
      const pyd = {
        res,
        ...notes?.getNotes,
      };

      cache.writeQuery({
        query: GET_NOTES_QUERY,
        data: {
          getNotes: pyd,
        },
      });

      cache.writeQuery({
        query: SELECT_NOTE_QUERY,
        data: {
          selectNote: res,
        },
      });
      toggleMenu();
    },

    onError: (err: any) => {
      const errMessage = err?.response?.errors[0]?.message;
      console.log(errMessage);
    },
  });

  const onLogout = () => {
    toggleMenu();
    client.clearStore();
    client.cache.writeQuery({
      query: USER_QUERY,
      data: { user: null },
    });
  };

  return (
    <div
      style={{ margin: 0, padding: 0 }}
      className="w-40 rounded-md border bg-white shadow-md overflow-hidden"
    >
      <ul className="text-sm">
        <li
          className="h-10 p-3 hover:bg-gray-100"
          role="button"
          onClick={() => createNote({ variables: createNoteVariables })}
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
  const { data } = useQuery<{ user: CurrentUserType }>(USER_QUERY, {
    fetchPolicy: "cache-only",
  });
  const { data: notes } = useQuery<{ getNotes: NoteType[] }>(GET_NOTES_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  const { data: selectedNote } = useQuery<{ selectNote: NoteType }>(
    SELECT_NOTE_QUERY,
    {
      fetchPolicy: "cache-only",
    }
  );

  const setCurrentNote = (note: NoteType) => {
    client.cache.writeQuery({
      query: SELECT_NOTE_QUERY,
      data: {
        selectNote: note,
      },
    });
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
            {data?.user?.fullname.charAt(0)}
          </div>
        </div>
        <div className="w-3/4 flex flex-col justify-center">
          <p className="capitalize text-sm">{data?.user?.fullname}</p>
          <p className="text-sm font-light text-gray-500">
            {data?.user?.email}
          </p>
        </div>
      </div>
      <div className="w-full h-[calc(100vh_-_80px)] overflow-y-auto px-2">
        {notes &&
        notes.getNotes &&
        Array.isArray(notes?.getNotes) &&
        notes?.getNotes.length ? (
          notes?.getNotes
            // .sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt))
            .map((note, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentNote(note)}
                onContextMenu={() => setCurrentNote(note)}
                className={classNames("my-2", {
                  "bg-violet-50 rounded-md":
                    selectedNote?.selectNote?.id === note.id,
                })}
              >
                <div
                  className={classNames("p-3 cursor-default", {
                    "border-b": selectedNote?.selectNote?.id !== note.id,
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
        ) : false ? (
          Array(7)
            .fill({})
            .map((_, idx) => (
              <div
                key={idx}
                className="w-full h-16 mt-3 rounded-sm bg-gray-200 animate-pulse"
              />
            ))
        ) : false ? (
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
