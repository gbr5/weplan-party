import styled, { css } from 'styled-components';

interface IButtonProps {
  isActive: boolean;
}

export const Container = styled.div`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MenuButton = styled.button<IButtonProps>`
  border-radius: 5px;
  padding: 8px;
  width: 47%;
  background-color: var(--letter-color-1);
  border: 1px solid var(--letter-color-3);
  align-items: center;
  justify-content: center;

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: var(--primary-color);
    `};
`;

export const MenuText = styled.p<IButtonProps>`
  color: var(--letter-color-4);
  font-weight: bold;
  font-size: 18px;

  ${({ isActive }) =>
    isActive &&
    css`
      color: var(--;etter-color-6);
    `};
`;
