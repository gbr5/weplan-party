import React, { useState, useMemo } from 'react';
import { Note } from '../../NotesComponents/Note';
import { NoteForm } from '../../NotesComponents/NoteForm';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';
import { WindowHeader } from '../../WindowHeader';
import INoteDTO from '../../../dtos/INoteDTO';
import { useTransaction } from '../../../hooks/transactions';
import { useEventVariables } from '../../../hooks/eventVariables';
import { useNote } from '../../../hooks/notes';

import { Container, NotesContainer } from './styles';
import { SearchNotes } from '../../NotesComponents/SearchNotes';

export function TransactionNotesWindow(): JSX.Element {
  const { createTransactionNote, selectedTransactionNotes } = useNote();
  const { selectedEventTransaction } = useEventVariables();
  const { handleTransactionNotesWindow } = useTransaction();

  const [filteredNotes, setFilteredNotes] = useState<INoteDTO[]>([]);

  function handleFilteredNotes(data: INoteDTO[]): void {
    setFilteredNotes(data);
  }

  async function handleNewTransactionNote(note: string): Promise<void> {
    await createTransactionNote({
      note,
      transaction_id: selectedEventTransaction.transaction.id,
    });
  }

  const notes = useMemo(() => {
    const onlyNotes = selectedTransactionNotes
      .map(({ note }) => note)
      .sort((a, b) => {
        if (new Date(a.updated_at) < new Date(b.updated_at)) return 1;
        if (new Date(a.updated_at) > new Date(b.updated_at)) return -1;
        return 0;
      });
    setFilteredNotes(onlyNotes);
    return onlyNotes;
  }, [selectedTransactionNotes]);

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleTransactionNotesWindow}
      containerStyle={{
        zIndex: 55,
        top: '5%',
        left: '0%',
        height: '90%',
        width: '100%',
      }}
    >
      <Container>
        <WindowHeader
          overTitle={`Transação: ${selectedEventTransaction.transaction.name}`}
          title="Notas"
        />
        <SearchNotes
          handleNotes={(data: INoteDTO[]) => handleFilteredNotes(data)}
          notes={notes}
        />
        <NoteForm
          handleNote={(e: string) => handleNewTransactionNote(e)}
          placeholder="Nova nota"
        />
        {filteredNotes.length > 0 && (
          <NotesContainer>
            {filteredNotes.map(item => (
              <Note key={item.id} note={item} />
            ))}
          </NotesContainer>
        )}
      </Container>
    </WindowUnFormattedContainer>
  );
}
