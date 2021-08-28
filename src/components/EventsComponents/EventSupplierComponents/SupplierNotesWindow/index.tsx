import React, { useState, useMemo, ReactElement } from 'react';
import { Note } from '../../../NotesComponents/Note';
import { NoteForm } from '../../../NotesComponents/NoteForm';
import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import { WindowHeader } from '../../../WindowHeader';
import INoteDTO from '../../../../dtos/INoteDTO';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { useNote } from '../../../../hooks/notes';
import { SearchNotes } from '../../../NotesComponents/SearchNotes';

import { Container, NotesContainer } from './styles';

export function SupplierNotesSection(): ReactElement {
  const { selectedEventSupplier } = useEventVariables();
  const { handleSupplierNotesWindow } = useEventSuppliers();
  const { createEventSupplierNote } = useNote();

  const [filteredNotes, setFilteredNotes] = useState<INoteDTO[]>([]);

  function handleFilteredNotes(data: INoteDTO[]): void {
    setFilteredNotes(data);
  }

  const notes = useMemo(() => {
    const onlyNotes = selectedEventSupplier.notes
      .map(({ note }) => note)
      .sort((a, b) => {
        if (new Date(a.updated_at) < new Date(b.updated_at)) return 1;
        if (new Date(a.updated_at) > new Date(b.updated_at)) return -1;
        return 0;
      });
    setFilteredNotes(onlyNotes);
    return onlyNotes;
  }, [selectedEventSupplier.notes]);

  async function handleNewSupplierNote(note: string): Promise<void> {
    await createEventSupplierNote({
      note,
      supplier_id: selectedEventSupplier.id,
    });
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleSupplierNotesWindow}
      containerStyle={{
        zIndex: 15,
        top: '5%',
        left: '0%',
        height: '90%',
        width: '100%',
      }}
    >
      <Container>
        <WindowHeader
          overTitle={`Fornecedor: ${selectedEventSupplier.name}`}
          title="Notas"
        />
        <SearchNotes
          handleNotes={(data: INoteDTO[]) => handleFilteredNotes(data)}
          notes={notes}
        />
        <NoteForm
          handleNote={(e: string) => handleNewSupplierNote(e)}
          placeholder="Nova nota"
        />
        {filteredNotes.length > 0 && (
          <NotesContainer>
            {filteredNotes.map(note => {
              return <Note key={note.id} note={note} />;
            })}
          </NotesContainer>
        )}
      </Container>
    </WindowUnFormattedContainer>
  );
}
