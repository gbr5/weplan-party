import styled, { css } from 'styled-components';

interface IButtonProps {
  isActive: boolean;
}

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0 16px;
  overflow-x: scroll;
`;

export const MenuButton = styled.button<IButtonProps>`
  display: flex;
  flex-direction: row;
  width: 180px;
  height: 56px;
  border-radius: 5px;
  ${({ isActive }) =>
    isActive
      ? css`
          background-color: var(--primary-color);
        `
      : css`
          background-color: var(--letter-color-1);
        `};
  margin: 0 8px;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

export const MenuText = styled.p`
  font-weight: bold;
  font-size: 18px;
  color: var(--letter-color-6);
  text-align: center;
  line-height: 26px;
`;
