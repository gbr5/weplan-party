import styled, { css, keyframes } from 'styled-components';

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

export const Container = styled.section`
  height: 450px;
  position: relative;

  > button {
    top: -16px;
    right: 0;
    width: 50px;
    height: 50px;
    position: absolute;
    background: transparent;
    border-radius: 50%;
    border: 1px solid var(--title-color);
    color: var(--title-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    margin-left: auto;

    &:hover {
      background: var(--primary-color);
      border-radius: 5%;
      border: 1px solid var(--title-color);
      box-shadow: var(--window-box-shadow);

      > svg {
        color: var(--background-color);
      }
    }
  }

  > strong {
    color: var(--primary-color);
    font-size: 32px;
    line-height: 42px;
    border-bottom: 1px solid var(--primary-color);
    display: block;
    margin-bottom: 32px;
    padding-bottom: 16px;
  }
`;

export const CheckListFunnel = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;

  @media (max-width: 1000px) {
    overflow-x: scroll;
  }

  > div {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
    min-width: 280px;

    > h1 {
      font-size: 24px;
      color: var(--primary-color);
    }

    > ul {
      height: 360px;
      background: var(--card-color);
      overflow-y: scroll;
      animation: ${appearFromTop} 0.5s;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 1px 1px 5px 4px rgba(90, 90, 90, 0.02);
      width: 100%;

      li + li {
        margin-top: 16px;
      }
      li {
        list-style: none;
        padding: 8px 16px;
        display: flex;
        grid-template-columns: 4fr 16fr 1fr;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid var(--letter-color-3);
        color: var(--primary-color);
        width: 100%;
        border-radius: 8px;
        background: var(--background-color);
        box-shadow: var(--box-shadow);

        &:hover {
          opacity: 0.8;
          box-shadow: var(--box-shadow-hover);
        }

        p {
          margin-right: 8px;
        }

        button {
          background: transparent;
          border: none;
          color: var(--letter-color-4);
          width: 100%;
          display: flex;
          justify-content: left;

          &:hover {
            color: var(--primary-color);
          }
          > span {
            margin-right: auto;
          }
        }

        > span {
          margin-left: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;

          button {
            background: transparent;
            border: none;
            color: var(--letter-color-4);
            transition: 0.25s;

            > span {
              margin-right: auto;
              transition: 0.25s;
            }

            &:hover {
              color: var(--primary-color);
            }
          }
        }
      }
    }
  }
`;

export const AddCheckListDrawer = styled.div`
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

  > input {
    height: 40px;
    width: 100%;
    border-radius: 4px;
    padding: 0 16px;
    border: none;
  }

  > span {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 16px;

    > h2 {
      font-size: 20px;
      color: var(--title-color);
    }

    > div {
      display: flex;
      gap: 32px;
    }
  }

  > div {
    display: flex;
    gap: 32px;
    width: 100%;

    > button + button {
      background: var(--red-color);
      color: var(--title-color);
      transition: 0.3s;

      &:hover {
        background: var(--card-color);
        color: var(--red-color);
        box-shadow: var(--box-shadow-hover);
      }
    }

    > button {
      background: var(--primary-color);
      border: none;
      height: 40px;
      width: 100%;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 500;
      box-shadow: var(--box-shadow);
      transition: 0.3s;

      &:hover {
        background: var(--title-color);
        color: var(--red-color);
        box-shadow: var(--window-box-shadow);
      }
    }
  }
`;

export const CheckedListItemDrawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > div {
    display: flex;
    gap: 16px;
    width: 100%;

    button {
      background: var(--primary-color);
      border: none;
      height: 40px;
      width: 90%;
      border-radius: 4px;
    }
  }
`;

interface ButtonProps {
  booleanActiveButton: boolean;
}

export const FlagButton = styled.button<ButtonProps>`
  font-size: 32px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
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
      box-shadow: var(--window-box-shadow);
      border: 1px solid var(--primary-color);

      &:hover {
        opacity: 0.8;
        background: var(--background-color);
      }
    `}
`;
