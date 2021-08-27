import '../../styles/global';
import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  width: 100%;
  height: 100vh;
  padding: 64px 0 16px;
  background-color: var(--letter-color-4);
`;

export const SearchContainer = styled.div`
  width: 100%;
  flex-direction: row;
  z-index: 1;
  align-items: center;
  justify-content: center;
`;

export const FriendsContainer = styled.div`
  flex: 1;
  width: 100%;
  padding: 8px 4px;
  border: 0.4px solid #e3e3e3;
`;

export const RequestsButton = styled.button`
  padding: 2px;
  border-radius: 4px;
  background-color: var(--letter-color-2);
  border: 0.3px solid var(--letter-color-3);
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin: 0 8px 14px;
`;
