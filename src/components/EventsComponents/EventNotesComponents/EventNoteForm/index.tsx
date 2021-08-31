import React from 'react';
import { NoteForm } from '../../../NotesComponents/NoteForm';
import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import { WindowHeader } from '../../../WindowHeader';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { useNote } from '../../../../hooks/notes';

export function EventNoteForm(): JSX.Element {
  const { selectedEvent } = useEventVariables();
  const { handleCreateEventNoteWindow, createEventNote } = useNote();

  async function handleNewNote(note: string): Promise<void> {
    await createEventNote({
      event_id: selectedEvent.id,
      note,
    });
    handleCreateEventNoteWindow();
  }
  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleCreateEventNoteWindow}
      containerStyle={{
        zIndex: 15,
        top: '5%',
        left: '0%',
        height: '90%',
        width: '100%',
      }}
      zIndex={14}
    >
      <WindowHeader title="Nova Nota do Evento" />

      <NoteForm
        handleNote={(data: string) => handleNewNote(data)}
        placeholder="Nova Nota"
      />
    </WindowUnFormattedContainer>
  );
}
