import React, { useState, useEffect, useCallback } from 'react';
import { ReactElement } from 'react';
import { FiEdit2 } from 'react-icons/fi';

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
  selectedNote: INoteDTO;
}

export function Note({ selectedNote }: IProps): ReactElement {
  const iconSize = 20;
  const { getUser, user } = useAuth();
  const { handleEditNoteWindow, selectNote } = useNote();

  const [author, setAuthor] = useState({} as IUserDTO);

  function handleEditNote(): void {
    selectNote(selectedNote);
    handleEditNoteWindow();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getAuthor = useCallback(async () => {
    user.id === selectedNote.author_id && setAuthor(user);
    const findAuthor = await getUser(selectedNote.author_id);
    if (findAuthor) return findAuthor;
    return undefined;
  }, [getUser, selectedNote, user]);

  useEffect(() => {
    getAuthor();
  }, [getAuthor]);

  return (
    <Container>
      <TextNote>{selectedNote.note}</TextNote>
      <EditNoteButton onClick={handleEditNote}>
        <FiEdit2 color="white" size={iconSize} />
      </EditNoteButton>
      <NoteFooter>
        {author && author.id && <NoteAuthor>{author.name}</NoteAuthor>}
        <NoteDate>
          {selectedNote.updated_at === selectedNote.created_at
            ? formatDateToString(String(selectedNote.created_at))
            : formatDateToString(String(selectedNote.updated_at))}
        </NoteDate>
      </NoteFooter>
    </Container>
  );
}
