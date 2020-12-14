import styled, { css } from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  background: var(--input-container-color);
  border-radius: 4px;
  padding: 8px;
  width: 100%;

  border: 2px solid var(--input-container-color);
  color: var(--letter-color-5);
  box-shadow: var(--box-shadow);

  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IButtonProps {
  isActive: boolean;
}

export const BooleanButton = styled.button<IButtonProps>`
  font-size: 32px;
  background: var(--letter-color-2);
  color: var(--letter-color-5);
  border-bottom: 0.5px solid var(--title-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  opacity: 0.65;
  transition: 0.5s;
  border-radius: 4px;
  width: 100%;

  box-shadow: var(--box-shadow);

  &:hover {
    opacity: 0.8;
    background: var(--primary-color);
    color: var(--background-color);
    box-shadow: var(--window-box-shadow);
  }

  ${props =>
    props.isActive &&
    css`
      background: var(--primary-color);
      color: var(--background-color);
      opacity: 1;
      transition: 0.5s;
      border-bottom: 1px solid var(--title-color);
      box-shadow: var(--window-box-shadow);

      &:hover {
        box-shadow: var(--box-shadow);
        opacity: 0.8;
        background: var(--background-color);
        color: var(--primary-color);
      }
    `}
`;
