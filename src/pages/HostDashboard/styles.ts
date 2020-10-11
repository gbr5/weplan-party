import styled, { css } from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  position: relative;
`;

export const Content = styled.main`
  position: relative;
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const MiddlePage = styled.div`
  margin-top: 132px;
  display: flex;
  flex-direction: column;
`;

export const MyNextEvent = styled.section`
  background: var(--header-background-color);
  padding: 24px;
  border-radius: 8px;
  height: 220px;
  box-shadow: 1px 1px 10px 5px rgba(100, 90, 10, 0.2);

  margin-bottom: 32px;
  position: relative;

  > button {
    background: transparent;
    border: none;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  span {
    position: absolute;
    top: 24px;
    right: 24px;
    color: var(--letter-color-2);
    font-size: 18px;
  }
`;

export const MyNextEventTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  width: 80%;
  border-bottom: 1px solid var(--primary-color);

  > strong {
    color: var(--letter-color-2);
    font-size: 20px;
    line-height: 26px;
    display: block;
  }

  h2 {
    margin-left: 24px;
    color: var(--title-color);
  }
`;

export const Section = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const Fields = styled.div`
  background-color: var(--card-color);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 90%;
  border-radius: 10px;
  position: relative;

  p {
    position: absolute;
    top: 8px;
    left: 8px;
  }

  h2 {
    font-size: 32px;
    color: var(--primary-color);
    margin-top: 16px;
  }
`;

export const BottomPage = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr;
  gap: 32px;
  height: 250px;
`;

export const BottomSection = styled.div`
  background: var(--header-background-color);
  padding: 24px;
  border-radius: 8px;
  box-shadow: 1px 1px 5px 4px rgba(50, 50, 50, 0.2);
  flex: 1;
  align-items: center;
  height: 250px;

  > div {
    border-bottom: 1px solid var(--letter-color-4);
    display: flex;
    gap: 16px;
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
    height: 150px;

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

          &:hover {
            color: var(--title-color);
            border-radius: 8%;
            background: rgba(0, 0, 0, 0.5);
          }
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
