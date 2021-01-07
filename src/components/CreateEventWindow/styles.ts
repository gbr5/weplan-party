import styled, { css } from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 4vh;
  padding: 2vh;
  width: 100%;
  height: 100%;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
    margin: 40px auto;
  }

  /* > button {
    margin: 2vh 0;
    height: 40px;
    width: 100%;
    border-radius: 4px;
    border: none;
    color: var(--secondary-color);
    background: var(--primary-color);
    box-shadow: var(--window-box-shadow);

    &:hover {
      background: var(--secondary-color);
      color: var(--primary-color);
      box-shadow: var(--box-shadow);
    }
  } */

  > input {
    height: 2.5rem;
    width: 100%;
    border-radius: 4px;
    padding: 0 16px;
    border: none;
  }
`;

export const PreviousButton = styled.button`
  background: rgba(255, 95, 95);
  width: 100%;
  border: none;
  border-radius: 4px;
  height: 40px;

  &:hover {
    opacity: 0.6;
  }
`;
export const NextButton = styled.button`
  background: rgba(105, 205, 105);
  width: 100%;
  border: none;
  border-radius: 4px;
  height: 40px;

  &:hover {
    opacity: 0.6;
  }
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
