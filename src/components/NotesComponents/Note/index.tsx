import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ReactElement } from 'react';

import INoteDTO from '../../../dtos/INoteDTO';
import IUserDTO from '../../../dtos/IUserDTO';
import { useAuth } from '../../../hooks/auth';
import { useCurrentEvent } from '../../../hooks/currentEvent';
import { useEventVariables } from '../../../hooks/eventVariables';
import { useNote } from '../../../hooks/notes';
import formatDateToString from '../../../utils/formatDateToString';
import { CloseButton } from '../../CloseButton';
import { NoteForm } from '../NoteForm';

import {
  Container,
  EditNoteButton,
  NoteAuthor,
  NoteDate,
  NoteFooter,
  TextNote,
} from './styles';

interface IProps {
  note: INoteDTO;
}

export function Note({ note }: IProps): ReactElement {
  const { getUser, user } = useAuth();
  const { getEventNotes } = useCurrentEvent();
  const { selectedEvent } = useEventVariables();
  const { editNote, selectNote } = useNote();

  const [author, setAuthor] = useState('');
  const [editNoteComponent, setEditNoteComponent] = useState(false);

  async function handleEditNote(data: string): Promise<void> {
    if (data !== '' || data !== note.note) {
      await editNote({
        ...note,
        note: data,
      });
      selectedEvent &&
        selectedEvent.id &&
        (await getEventNotes(selectedEvent.id));
    }
    setEditNoteComponent(false);
  }

  function openEditNote(): void {
    setEditNoteComponent(true);
    selectNote(note);
  }

  function closeEditNote(): void {
    setEditNoteComponent(false);
    selectNote({} as INoteDTO);
  }

  const getAuthor = useCallback(async () => {
    const findAuthor = await getUser(note.author_id);
    findAuthor && setAuthor(findAuthor.name);
    return undefined;
  }, [getUser, note]);

  useEffect(() => {
    if (selectedEvent.id !== note.author_id && user.id !== note.author_id) {
      getAuthor();
    }
    if (selectedEvent.id === note.author_id) {
      setAuthor('WePlan');
    }
    if (user.id === note.author_id) {
      setAuthor(user.name);
    }
  }, [getAuthor, selectedEvent, note, user]);

  const cols = useMemo(() => {
    const screenWidth = window.screen.width;
    return screenWidth * 0.08;
  }, []);

  const rows = useMemo(() => {
    return note.note.length / cols + 5;
  }, [note, cols]);

  return (
    <Container>
      {editNoteComponent ? (
        <>
          <CloseButton closeFunction={closeEditNote} />
          <NoteForm
            defaulValue={note.note}
            placeholder={note.note}
            handleNote={handleEditNote}
          />
        </>
      ) : (
        <EditNoteButton onClick={openEditNote}>
          <TextNote disabled cols={cols} rows={rows} defaultValue={note.note} />
        </EditNoteButton>
      )}
      <NoteFooter>
        <NoteAuthor>{author}</NoteAuthor>
        <NoteDate>
          {note.updated_at === note.created_at
            ? formatDateToString(String(note.created_at))
            : formatDateToString(String(note.updated_at))}
        </NoteDate>
      </NoteFooter>
    </Container>
  );
}
