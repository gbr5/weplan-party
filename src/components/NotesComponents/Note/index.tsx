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
  const { user } = useAuth();
  const { getEventNotes } = useCurrentEvent();
  const { selectedEvent, eventMembers, eventOwners } = useEventVariables();
  const { editNote, selectNote } = useNote();

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

  const cols = useMemo(() => {
    const screenWidth = window.screen.width;
    return screenWidth * 0.08;
  }, []);

  const rows = useMemo(() => {
    return note.note.length / cols + 5;
  }, [note, cols]);

  const author = useMemo(() => {
    if (selectedEvent.id === note.author_id) return 'WePlan';
    if (user.id === note.author_id) {
      const { personInfo } = user;
      return personInfo
        ? `${personInfo.first_name}  ${personInfo.last_name}`
        : user.name;
    }
    const findOwner = eventOwners.find(
      owner => owner.userEventOwner.id === note.author_id,
    );
    if (findOwner) {
      const owner = findOwner.userEventOwner.personInfo;
      return owner
        ? `${owner.first_name}  ${owner.last_name}`
        : findOwner.userEventOwner.name;
    }
    const findMember = eventMembers.find(
      owner => owner.userEventMember.id === note.author_id,
    );
    if (findMember) {
      const member = findMember.userEventMember.personInfo;
      return member
        ? `${member.first_name}  ${member.last_name}`
        : findMember.userEventMember.name;
    }
    return '';
  }, [eventOwners, eventMembers, user, selectedEvent, note]);

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
