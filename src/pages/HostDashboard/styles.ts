import styled, { css } from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  position: relative;
`;

export const Content = styled.main`
  position: relative;
  max-width: 100%;
  margin: 0 4vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    margin: 0 1vh;
    /* padding-bottom: 8vh; */
  }
`;

export const MiddlePage = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  /* @media (max-width: 1000px) {
    margin-top: 2vh;
  } */
`;

export const BottomPage = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4vh;
  height: 100%;

  @media (max-width: 1100px) {
    display: block;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2vh;
    height: 100%;

    margin-bottom: 2vh;
  }
`;

export const BottomSection = styled.div`
  background: var(--header-background-color);
  padding: 2vw 2vh;
  border-radius: 8px;
  box-shadow: 1px 1px 5px 4px rgba(50, 50, 50, 0.2);
  flex: 1;
  align-items: center;
  height: 40vh;
  width: 100%;

  @media (max-width: 1100px) {
    margin: 2vh auto;
  }

  > div {
    border-bottom: 1px solid var(--letter-color-4);
    display: flex;
    gap: 2vw;
    margin-bottom: 12px;
    padding-bottom: 16px;

    > strong {
      color: var(--letter-color-2);
      font-size: 20px;
      line-height: 26px;
    }

    > div {
      margin-left: auto;
      display: flex;
      gap: 24px;

      > button {
        background: transparent;
        border: none;
        color: var(--primary-color);
      }
    }
  }

  ul {
    overflow-y: scroll;
    height: 85%;

    li + li {
      padding-top: 14px;
    }
    li {
      list-style: none;
      padding: 0 8px 12px;
      display: flex;
      gap: 24px;
      align-items: center;
      border-bottom: 1px solid var(--letter-color-4);
      transition: 0.25s;

      &:hover {
        > svg {
          color: var(--primary-color);
        }

        button {
          h3 {
            color: var(--primary-color);
          }
        }

        div {
          button {
            color: var(--primary-color);
          }
        }
      }

      > button {
        background: transparent;
        border: none;
        text-align: left;
        width: 100%;

        &:hover {
          color: var(--title-color);
          h3 {
            color: var(--title-color);
          }
        }

        h3 {
          color: var(--letter-color-4);

          @media (max-width: 1000px) {
            font-size: 12px;
          }
        }
      }

      > svg {
        color: var(--title-color);
        width: 32px;
      }

      span {
        display: flex;
        margin-left: auto;
        color: var(--primary-color);
        gap: 16px;

        > button {
          color: var(--red-color);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8%;
          border: none;
          transition: 0.25s;
          background: transparent;

          > svg {
            margin: auto;
            color: var(--letter-color-1);

            &:hover {
              color: var(--title-color);
            }
          }
        }
      }

      > div {
        margin-left: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        > button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          background: transparent;
          border: none;
          transition: 0.25s;
          border-radius: 1%;
          width: 100%;
          /*
          &:hover {
            padding: 0 4px;
            width: 32px;
            color: var(--title-color);
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.5);
          } */
        }

        span {
          margin-left: 4px;
          color: var(--primary-color);

          > button {
            margin: auto 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            border: none;
            transition: 0.25s;

            &:hover {
              color: var(--title-color);
              border-radius: 50%;
              background: rgba(0, 0, 0, 0.5);
            }
          }
        }
      }
    }
  }
`;

interface ButtonProps {
  booleanActiveButton: boolean;
}

export const BooleanNavigationButton = styled.button<ButtonProps>`
  font-size: 18px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  opacity: 0.65;
  transition: 0.25s;

  &:hover {
    opacity: 1;
  }
  > svg {
    color: var(--primary-color);
  }

  ${props =>
    props.booleanActiveButton &&
    css`
      color: var(--letter-color-4);
      opacity: 1;
      transition: 0.25s;
    `}
`;

export const DateSection = styled.div`
  width: 150px;
  color: var(--primary-color);

  @media (max-width: 1000px) {
    width: 50px;
    font-size: 12px;
  }
`;
