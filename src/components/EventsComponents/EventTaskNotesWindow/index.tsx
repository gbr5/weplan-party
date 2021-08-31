import React from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { differenceInMilliseconds } from 'date-fns';
import { Note } from '../../NotesComponents/Note';
import { NoteForm } from '../../NotesComponents/NoteForm';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';
import { useEventTasks } from '../../../hooks/eventTasks';
import { useEventVariables } from '../../../hooks/eventVariables';
import { useNote } from '../../../hooks/notes';

import {
  Container,
  NotesContainer,
  Title,
  Underline,
  TaskTitle,
} from './styles';

export function EventTaskNotesWindow(): JSX.Element {
  const { selectedEventTask } = useEventVariables();
  const { createTaskNote, handleEventTaskNotesWindow } = useEventTasks();
  const { updateNotes } = useNote();

  async function handleCreateTaskNote(note: string): Promise<void> {
    if (note !== '' && note) {
      await createTaskNote({
        note,
        task_id: selectedEventTask.id,
      });
      await updateNotes();
    }
  }

  const notes = useMemo(() => {
    return selectedEventTask.notes
      .map(note => note.note)
      .sort((a, b) => {
        if (
          differenceInMilliseconds(
            new Date(a.updated_at),
            new Date(b.updated_at),
          ) >= 0
        )
          return -1;
        if (
          differenceInMilliseconds(
            new Date(a.updated_at),
            new Date(b.updated_at),
          ) < 0
        )
          return 1;
        return 0;
      });
  }, [selectedEventTask]);

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleEventTaskNotesWindow}
      containerStyle={{
        top: '5%',
        left: '0%',
        height: '95%',
        width: '100%',
        zIndex: 15,
      }}
      zIndex={14}
    >
      <Container>
        <Title>Notas</Title>
        <Underline />
        <TaskTitle>Tarefa: {selectedEventTask.title}</TaskTitle>

        <NoteForm
          handleNote={(data: string) => handleCreateTaskNote(data)}
          placeholder=""
        />

        <NotesContainer>
          {notes.map(item => (
            <Note key={item.id} note={item} />
          ))}
        </NotesContainer>
      </Container>
    </WindowUnFormattedContainer>
  );
}
