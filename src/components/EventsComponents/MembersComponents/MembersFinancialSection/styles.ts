import styled, { css } from 'styled-components';

interface IMenuButtonProps {
  isActive: boolean;
}

export const Container = styled.div`
  flex: 1;
  width: 100%;
`;

export const MenuContainer = styled.div`
  width: 100%;
  height: 48px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const MenuButton = styled.button<IMenuButtonProps>`
  width: 47%;
  padding: 8px;
  border-radius: 5px;
  ${({ isActive }) =>
    isActive
      ? css`
          background-color: var(--primary-color);
        `
      : css`
          background-color: var(--letter-color-1);
        `};
  align-items: center;
  justify-content: center;
`;

export const MenuTitle = styled.p`
  font-weight: bold;
  font-size: 18px;
  color: var(--letter-color-6);
  text-align: center;
  line-height: 26px;
`;

export const Body = styled.div`
  width: 100%;
  height: 64%;
`;
