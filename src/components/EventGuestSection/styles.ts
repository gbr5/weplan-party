import styled, { css, keyframes } from 'styled-components';

import Tooltip from '../Tooltip';

const appearFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-150px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const GuestAllocationButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  font-weight: 500;
  color: var(--title-color);
  border-radius: 8px;
  transition: 0.5s;

  @media (max-width: 1000px) {
    font-size: 20px;
  }

  &:hover {
    opacity: 0.7;
    background: var(--primary-color);
    color: var(--letter-color-5);
    box-shadow: var(--window-box-shadow);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  animation: ${appearFromTop} 0.5s;

  > h1 {
    margin: 0 auto;
    color: var(--primary-color);
  }

  > h3 {
    font-size: 24px;
    color: var(--text-color);
    margin: 0 auto;
  }

  > span {
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
    gap: 32px;
    border-bottom: 1px solid var(--primary-color);

    > span {
      position: absolute;
      width: 100%;
      top: -48px;
      /* right: 47.8%; */
      display: flex;
      align-items: center;
      justify-content: center;
      /*
      @media (max-width: 1000px) {
        right: 45%;
      } */

      > button {
        width: 100%;
        font-size: 16px;
        background: transparent;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4vh;
        transition: 0.5s;
        height: 40px;
        color: var(--primary-color);

        &:hover {
          color: var(--title-color);
          /* border-radius: 50%; */
          background: var(--header-background-color);
          box-shadow: 0px 0px 6px 6px rgba(255, 150, 10, 0.3);

          svg {
            color: var(--title-color);
          }
        }

        > svg {
          color: var(--primary-color);
          /* border-radius: 50%; */
        }
      }
    }
  }

  > div {
    width: 100%;
    height: 400px;

    max-height: 500px;
    padding: 16px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    background: var(--header-background-color);
    border-radius: 8px;
    overflow-y: scroll;

    @media (max-width: 1000px) {
      display: block;
    }
  }
`;

interface ButtonProps {
  booleanActiveButton: boolean;
}

export const BooleanNavigationButton = styled.button<ButtonProps>`
  font-size: 32px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  opacity: 0.65;
  transition: 0.5s;
  border-radius: 0;
  @media (max-width: 1000px) {
    font-size: 24px;
  }

  &:hover {
    color: var(--text-color);
    opacity: 1;
    border-radius: 15px;
    background: var(--header-background-color-hover);
  }
  > svg {
    color: var(--primary-color);
  }

  ${props =>
    props.booleanActiveButton &&
    css`
      color: var(--text-color);
      opacity: 1;
      transition: 0.25s;

      &:hover {
        opacity: 0.8;
        background: var(--background-color);
      }
    `}
`;
