import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  width: 100%;
`;

export const Body = styled.div`
  /* flex: 1; */
  width: 100%;
  height: 85%;
`;

export const OwnersContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  width: 100%;
  height: 600px;
  padding: 4px;
  border-radius: 8px;
  border: none;
  background-color: var(--letter-color-1);
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  overflow-y: scroll;
`;
