import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  margin: 40px 0;
`;

export const Title = styled.p`
  color: var(--letter-color-6);
  font-size: 20px;
  text-align: center;
  margin: 4px 0;
`;

export const TaskTitle = styled.p`
  color: var(--letter-color-6);
  font-size: 16px;
`;

export const Underline = styled.div`
  background-color: var(--primary-color);
  height: 4px;
  width: 100%;
  margin: 8px 0;
`;

export const NotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  border-radius: 8px;
  max-height: 450px;
  overflow-y: scroll;
  padding: 4px 8px;
  position: relative;
  background-color: var(--letter-color-1);
`;
