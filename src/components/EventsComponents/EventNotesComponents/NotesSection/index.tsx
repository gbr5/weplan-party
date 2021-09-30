import React, { useMemo, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import INoteDTO from '../../../../dtos/INoteDTO';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { useNote } from '../../../../hooks/notes';
import { Note } from '../../../NotesComponents/Note';
import { SearchNotes } from '../../../NotesComponents/SearchNotes';
import { EventNoteForm } from '../EventNoteForm';

import { Container } from './styles';

export function NotesSection(): JSX.Element {
  const { eventNotes, isOwner } = useEventVariables();
  const { handleCreateEventNoteWindow, createEventNoteWindow } = useNote();

  const [filteredNotes, setFilteredNotes] = useState<INoteDTO[]>([]);
  const [search, setSearch] = useState(false);

  function handleSearch(): void {
    setSearch(!search);
  }

  function handleFilteredNotes(data: INoteDTO[]): void {
    setFilteredNotes(data);
  }

  const notes = useMemo(() => {
    const onlyNotes = eventNotes
      .map(({ note }) => note)
      .sort((a, b) => {
        if (new Date(a.updated_at) < new Date(b.updated_at)) return 1;
        if (new Date(a.updated_at) > new Date(b.updated_at)) return -1;
        return 0;
      });
    setFilteredNotes(onlyNotes);
    return onlyNotes;
  }, [eventNotes]);

  return (
    <>
      {createEventNoteWindow && <EventNoteForm />}

      <Container>
        <h1>Notas</h1>
        <span>
          <SearchNotes handleNotes={handleFilteredNotes} notes={notes} />
          {isOwner && (
            <span>
              <button type="button" onClick={handleCreateEventNoteWindow}>
                <MdAdd size={40} />
              </button>
            </span>
          )}
        </span>

        <div>
          {filteredNotes.map(note => {
            return <Note key={note.id} note={note} />;
          })}
        </div>
      </Container>
    </>
  );
}
