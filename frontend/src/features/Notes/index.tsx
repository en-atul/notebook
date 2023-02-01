
import { CreateEditNote } from "./EditNote";
import { NoteList } from "./NoteList";

export default function Notes() {
  return (
    <div className="grid grid-cols-12 h-full">
      <NoteList />
      <CreateEditNote/>
    </div>
  );
}
