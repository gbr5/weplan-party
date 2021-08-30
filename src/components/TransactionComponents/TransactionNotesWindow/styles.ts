import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  padding-top: 40px;
  width: 100%;
`;

export const NotesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex: 1;
  height: 320px;
  margin: 8px 0;
  padding: 0 4px;
  padding-bottom: 32px;
  border-radius: 8px;
  border: none;
  background-color: var(--letter-color-1);
  padding: 8px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  overflow-y: scroll;

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
`;
