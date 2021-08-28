import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: var(--letter-color-1);
  border-radius: 5px;
  padding-top: 5px;
  justify-content: space-between;
  margin: 8px 0;
  border: 0.5px solid var(--letter-color-3);
`;

export const TextNote = styled.textarea`
  padding: 5px;
  color: var(--letter-color-6);
  font-size: 16px;
  width: 99%;
  border: none;
  text-decoration: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  padding: 8px;
  letter-spacing: 0.8px;
  border-radius: 5px;
`;

export const NoteFooter = styled.div`
  padding: 5px;
  display: flex;
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
  border: none;
`;
