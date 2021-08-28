import React from 'react';
import INoteDTO from '../../../dtos/INoteDTO';
import { useNote } from '../../../hooks/notes';
import { NoteForm } from '../NoteForm';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';

import { Container, Title } from './styles';

export function EditNoteWindow(): JSX.Element {
  const { editNote, selectedNote, handleEditNoteWindow } = useNote();

  async function handleEditNote(note: string): Promise<void> {
    if (note !== '') {
      await editNote({
        ...selectedNote,
        note,
      });
      handleEditNoteWindow();
    }
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleEditNoteWindow}
      containerStyle={{
        zIndex: 25,
        top: '5%',
        left: '0%',
        height: '90%',
        width: '100%',
      }}
    >
      <Container>
        <Title>Atualizar nota</Title>
        <NoteForm
          defaulValue={selectedNote.note}
          handleNote={(note: string) => handleEditNote(note)}
          placeholder={selectedNote.note}
        />
      </Container>
    </WindowUnFormattedContainer>
  );
}
