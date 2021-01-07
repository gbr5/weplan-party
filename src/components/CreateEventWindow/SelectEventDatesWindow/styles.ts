import styled, { css } from 'styled-components';
import '../../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  gap: 4vh;

  h2 {
    font-size: 24px;
  }

  footer {
    display: flex;
    width: 100%;
    gap: 4vw;
  }
`;

export const MonthContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  gap: 4vh;
`;

export const PreviousButton = styled.button`
  width: 100%;
  background: rgba(255, 95, 95);
  border: none;
  border-radius: 4px;
  height: 40px;

  &:hover {
    opacity: 0.8;
  }
`;
export const NextButton = styled.button`
  width: 100%;
  background: rgba(105, 205, 105);
  border: none;
  border-radius: 4px;
  height: 40px;

  &:hover {
    opacity: 0.8;
  }
`;

interface IButtonProps {
  isActive: boolean;
}

export const BooleanButton = styled.button<IButtonProps>`
  font-size: 20px;
  background: var(--background-color);
  color: var(--primary-color);
  border-bottom: 0.5px solid var(--title-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.65;
  transition: 0.5s;
  border-radius: 4px;
  width: 100%;
  height: 40px;

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
