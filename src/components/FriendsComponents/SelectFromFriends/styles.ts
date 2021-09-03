import styled, { css } from 'styled-components';

interface IProps {
  isSelected: boolean;
}

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
`;

export const FriendsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  padding: 8px 4px;
  border: none;
  height: 550px;
  background-color: var(--letter-color-1);
  border-radius: 8px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  margin: 16px 0;
`;
