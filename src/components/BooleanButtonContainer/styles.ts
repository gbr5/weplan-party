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
  border-bottom: 0.5px solid var(--title-color);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--secondary-color);
  color: var(--primary-color);
  opacity: 0.65;
  transition: 0.5s;
  border-radius: 4px;
  width: 100%;

  @media (max-width: 1000px) {
    font-size: 18px;
  }

  box-shadow: var(--box-shadow);

  &:hover {
    opacity: 0.8;
  }

  ${props =>
    !props.isActive &&
    css`
      background: var(--primary-color);
      color: var(--secondary-color);
      opacity: 1;
      transition: 0.5s;
      border-bottom: 1px solid var(--title-color);
      box-shadow: var(--window-box-shadow);

      &:hover {
        opacity: 0.8;
      }
    `}
`;
