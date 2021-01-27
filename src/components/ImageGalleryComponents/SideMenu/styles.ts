import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 7.8vh;
  right: 0;
  z-index: 15;
  background: rgba(50, 50, 50, 0.5);
  padding: 0 4px;

  display: flex;
  flex-direction: column;

  height: 100%;
  transition: 0.3s;

  &:hover {
    color: var(--primary-color);
    opacity: 0.8;
  }
`;

export const MenuContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);

  height: 80vh;
`;

interface IMenuButton {
  isActive: boolean;
}

export const HanldeMenuButton = styled.button<IMenuButton>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--secondary-color);
  border: none;
  border-radius: 4px;
  background: var(--primary-color);

  position: fixed;
  bottom: 4px;
  right: 4px;
  transition: 0.3s;

  &:hover {
    background: var(--title-color);
    color: var(--card-color);
  }

  svg {
    box-shadow: var(--box-shadow);
  }

  ${props =>
    props.isActive &&
    css`
      background: rgba(15, 15, 15, 0.6);
      color: var(--title-color);
      box-shadow: var(--window-box-shadow);
      &:hover {
        background: var(--title-color);
        color: var(--card-color);
      }
    `}
`;

export const MenuButton = styled.button`
  background: transparent;
  border: none;
  color: var(--primary-color);
`;
