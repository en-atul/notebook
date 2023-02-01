
import { NoteList } from "./NoteList";

export default function Notes() {
  return (
    <div className="grid grid-cols-12 h-full">
      <NoteList />
      <section className="col-span-10 h-full">

      </section>
    </div>
  );
}
