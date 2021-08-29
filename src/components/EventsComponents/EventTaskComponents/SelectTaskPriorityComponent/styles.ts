import styled, { css } from 'styled-components';

interface IButtonProps {
  isActive: boolean;
}

export const Container = styled.div`
  width: 100%;
  margin: 16px 0;
  justify-content: center;
`;

export const Title = styled.p`
  color: var(--letter-color-6);
  font-size: 20px;
  margin-bottom: 12px;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 16px;
  border-radius: 5px;
  border: 1px solid var(--letter-color-3);
`;

export const IconButton = styled.button<IButtonProps>`
  border: 1px solid var(--letter-color-3);
  background-color: var(--letter-color-1);
  padding: 6px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.3);
  ${({ isActive }) =>
    isActive &&
    css`
      background-color: var(--title-color);
      border: 1px solid black;
      padding: 4px;
      width: 68px;
      height: 68px;
      box-shadow: 0 0 3px 3px rgba(250, 150, 10, 0.3);
    `};
`;
