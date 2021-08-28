import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ReactElement } from 'react';

import INoteDTO from '../../../dtos/INoteDTO';
import IUserDTO from '../../../dtos/IUserDTO';
import { useAuth } from '../../../hooks/auth';
import { useNote } from '../../../hooks/notes';
import formatDateToString from '../../../utils/formatDateToString';

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
  const { handleEditNoteWindow, selectNote } = useNote();

  const [author, setAuthor] = useState({} as IUserDTO);

  function handleEditNote(): void {
    selectNote(note);
    handleEditNoteWindow();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getAuthor = useCallback(async () => {
    user.id === note.author_id && setAuthor(user);
    const findAuthor = await getUser(note.author_id);
    if (findAuthor) return findAuthor;
    return undefined;
  }, [getUser, note, user]);

  useEffect(() => {
    getAuthor();
  }, [getAuthor]);

  const cols = useMemo(() => {
    const screenWidth = window.screen.width;
    return screenWidth * 0.08;
  }, []);

  const rows = useMemo(() => {
    return note.note.length / cols + 5;
  }, [note, cols]);

  return (
    <Container>
      <EditNoteButton onClick={handleEditNote}>
        <TextNote disabled cols={cols} rows={rows}>
          {note.note}
        </TextNote>
      </EditNoteButton>
      <NoteFooter>
        <NoteAuthor>{author && author.id && author.name}</NoteAuthor>
        <NoteDate>
          {note.updated_at === note.created_at
            ? formatDateToString(String(note.created_at))
            : formatDateToString(String(note.updated_at))}
        </NoteDate>
      </NoteFooter>
    </Container>
  );
}
