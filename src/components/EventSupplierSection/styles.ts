import styled, { keyframes, css } from 'styled-components';
import '../../styles/global';

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
      top: 0px;
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
          color: var(--primary-color);
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

export const AddMemberDrawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
    margin-bottom: 32px;
  }

  button {
    margin-top: 24px;
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 100%;
    border-radius: 4px;
  }
`;

export const MembersWindow = styled.div`
  display: grid;
  grid-template-rows: 1fr 5fr;
  gap: 16px;
  width: 100%;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    > h1 {
      position: absolute;
      top: 24px;
      left: 24px;
      font-size: 24px;
      color: var(--title-color);
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin: 0 auto;

      h1 {
        font-size: 32px;
        color: var(--primary-color);
      }

      strong {
        font-size: 32px;
        color: var(--title-color);
      }
    }
  }
`;

export const MembersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 32px;
  width: 100%;
  gap: 32px;
  overflow-y: scroll;

  button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 8px;
    background: var(--letter-color-3);
    height: 100px;
    padding: 32px auto;
    gap: 16px;
    box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.2);
    transition: 0.25s;

    > img {
      margin-left: 14px;
      height: 80px;
      width: 80px;
      border-radius: 50%;
      box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.2);
      transition: 0.25s;

      &:hover {
        box-shadow: 5px 5px 6px 2px rgba(255, 150, 10, 0.4);
      }
    }

    > h1 {
      font-size: 24px;
      color: var(--letter-color-5);
    }

    &:hover {
      box-shadow: 4px 4px 6px 2px rgba(255, 150, 10, 0.3);
      opacity: 0.8;
    }
  }
`;

export const Supplier = styled.div`
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

  @media (max-width: 1000px) {
    margin-bottom: 2vh;
  }
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
