import styled, { css } from 'styled-components';

interface IProps {
  isActive: boolean;
}

export const Container = styled.div`
  background-color: var(--letter-color-1);
  padding: 16px;
  padding-top: 32px;
  border-radius: 8px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.3);
  flex: 1;
  width: 100%;
  margin: 24px 0;
`;
export const Menu = styled.div`
  width: 100%;
  margin: 8px 0;
  max-height: 64px;
  overflow-x: scroll;
`;
export const MenuButton = styled.button<IProps>`
  width: 140px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 60px;
  margin: 0 8px;
  ${({ isActive }) =>
    isActive
      ? css`
          background-color: var(--primary-color);
        `
      : css`
          background-color: var(--letter-color-1);
        `};
`;

export const Type = styled.p`
  width: 100%;
  color: var(--letter-color-6);
  font-size: 18px;
`;
export const MenuText = styled.p`
  color: var(--letter-color-6);
  font-size: 18px;
`;

export const Underline = styled.div`
  background-color: var(--primary-color);
  height: 1px;
  width: 100%;
  margin: 4px 0 12px;
`;
