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
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
    gap: 32px;
    border-bottom: 1px solid var(--primary-color);

    > span {
      position: absolute;
      top: 54px;
      right: 24px;

      > button {
        font-size: 32px;
        background: transparent;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.5s;
        width: 40px;
        height: 40px;

        &:hover {
          color: var(--title-color);
          border-radius: 50%;
          background: var(--header-background-color);
          box-shadow: 0px 0px 6px 6px rgba(255, 150, 10, 0.3);

          svg {
            color: var(--title-color);
          }
        }

        > svg {
          color: var(--card-color);
          border-radius: 50%;
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
  }
`;

export const NotHostGuest = styled(Tooltip)`
  font-size: 16px;
  color: var(--title-color);
  margin: auto auto auto 0;
  transition: 0.25s;

  &:hover {
    opacity: 0.8;
    color: var(--primary-color);
  }

  > strong {
    font-weight: 500;
  }

  svg {
    margin: 0;
  }

  span {
    background: var(--red-color);
    color: var(--letter-color-1);
    text-align: center;

    &::before {
      border-color: var(--red-color) transparent;
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

export const Guest = styled.div`
  width: 100%;
  height: 56px;
  margin: 0 auto;
  padding: 8px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
  border-radius: 4px;
  transition: 0.25s;

  &:last-child {
    margin-bottom: 16px;
  }

  &:hover {
    box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
    background: var(--card-color);

    p {
      color: var(--title-color);
    }
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;

    > p {
      color: var(--text-color);
      font-size: 16px;
      margin-left: 8px;
    }

    > button {
      background: transparent;
      border: none;
      font-size: 16px;
      color: var(--text-color);
      margin: 0 24px;
      transition: 0.25s;
      width: 100%;
      display: flex;

      &:hover {
        opacity: 0.8;
        color: var(--title-color);

        svg {
          opacity: 1;
          color: var(--title-color);
        }
      }

      > strong {
        font-weight: 500;
        margin-right: auto;
      }

      > svg {
        opacity: 0.3;
        color: var(--text-color);
        transition: 0.25s;
        margin-left: auto;
      }
    }
  }

  > button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);
    margin: 0 auto;
    transition: 0.25s;
    border-radius: 4px;

    &:hover {
      opacity: 0.8;
      box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
    }
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    transition: 0.25s;
    border-radius: 4px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      color: var(--text-color);
      transition: 0.25s;

      &:hover {
        opacity: 0.8;
        color: var(--primary-color);
      }
    }
  }
`;

export const AddGuestDrawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.25s;
  width: 100%;

  > h1 {
    font-size: 32px;
    color: var(--title-color);
  }

  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    width: 100%;

    > button {
      height: 40px;
      width: 100%;
      border-radius: 4px;
      padding: 0 16px;
      border: none;
      transition: 0.25s;

      &:hover {
        opacity: 0.8;
        box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
      }
    }

    > h1 {
      > button {
        background: transparent;
        border: none;
        color: var(--primary-color);
        font-size: 24px;
        font-weight: 500;
        transition: 0.25s;

        &:hover {
          opacity: 0.8;
          box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
        }
      }
    }
  }

  button {
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 100%;
    border-radius: 4px;
    margin-bottom: 16px;
    transition: 0.25s;

    &:hover {
      opacity: 0.8;
      box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
    }
  }
`;

export const GuestConfirmedDrawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  width: 100%;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > div {
    display: flex;
    width: 100%;
    gap: 16px;

    button {
      background: var(--primary-color);
      border: none;
      height: 40px;
      font-weight: 500;
      width: 100%;
      border-radius: 4px;
    }
  }
`;

export const AddMultipleGuests = styled.span`
  width: 100%;

  > button {
    width: 100%;
    display: flex;
    gap: 24px;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--primary-color);
    transition: 0.25s;

    &:hover {
      color: var(--title-color);
      background: var(--button-background-hover);
    }
  }
`;
