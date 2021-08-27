import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background-color: var(--letter-color-1);
  border-radius: 5px;
  padding-top: 5px;
  justify-content: space-between;
  margin: 8px 0;
  border: 0.5px solid var(--letter-color-3);
`;

export const TextNote = styled.p`
  padding: 5px;
  color: var(--letter-color-6);
  font-size: 16px;
  margin: 8px 0 8px 8px;
`;

export const NoteFooter = styled.div`
  padding: 5px;
  flex-direction: row;
  background-color: var(--letter-color-2);
  border-radius: 5px;
  justify-content: space-between;
  border: 0.5px solid var(--letter-color-3);
`;

export const NoteDate = styled.p`
  color: var(--letter-color-4);
  font-size: 14px;
`;

export const NoteAuthor = styled.p`
  color: var(--letter-color-6);
  font-size: 14px;
`;

export const EditNoteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  border-radius: 5px;
  background-color: var(--letter-color-5);
  padding: 5px;
  align-items: center;
  justify-content: center;
  border: 0.5px solid var(--letter-color-3);
`;
