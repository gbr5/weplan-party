import styled from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4vh;
  padding: 16px;
  background: var(--header-background-color);
  border-radius: 8px;
  height: 600px;
  box-sizing: border-box;

  > h1 {
    color: var(--primary-color);
    font-size: 24px;
    border-bottom: 1px solid var(--title-color);
  }

  > span {
    display: flex;
    gap: 32px;
    align-items: center;
    justify-content: center;
    margin: 0;
    width: 100%;

    > h1 {
      color: var(--primary-color);
      font-size: 40px;
      border-bottom: 1px solid var(--title-color);
    }

    > button {
      width: 50px;
      height: 40px;
      border-radius: 8px;

      &:hover {
        opacity: 0.6;
      }
    }

    > span {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;

      > div {
        background: var(--card-color);
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: center;
        height: 60px;
        width: 100%;
        border-radius: 8px;
        box-shadow: var(--window-box-shadow);

        > h3 {
          font-size: 20px;
          color: var(--background-color);
        }

        > p {
          font-size: 20px;
          color: var(--letter-color-5);
        }
        > div:last-child() {
          color: var(--red-color);
        }
      }
    }
  }

  > div {
    display: grid;
    grid-template-columns: 2fr 4fr;
    gap: 40px;
    height: 100%;
    width: 100%;
    padding-bottom: 32px;
    @media (max-width: 1000px) {
      display: flex;
      flex-direction: column;
    }
  }
`;

export const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4vh;
  height: 100%;

  box-sizing: border-box;
  overflow-y: scroll;
  width: 100%;

  > ul {
    border-radius: 8px;
    display: block;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 4vh;
    /* background: var(--card-color); */
    box-shadow: var(--window-box-shadow);

    > li {
      display: flex;
      font-size: 16px;
      height: 40px;
      align-items: center;
      justify-content: center;

      > strong {
        color: var(--letter-color-4);
      }

      > span {
        display: flex;
        gap: 4vw;
        margin-left: auto;
        align-items: center;
        justify-content: center;

        > button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
        }
        div {
          > button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
          }
        }
      }
    }
  }
`;

export const GroupMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4vh;
  height: 100%;
  width: 100%;

  > button {
    text-align: left;
    font-size: 20px;
    box-shadow: none;
    background: transparent;
    border: none;
    color: var(--title-color);
    transition: 0.25s;
    box-shadow: var(--window-box-shadow);
    padding: 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    > svg {
      margin-left: auto;
    }

    &:hover {
      box-shadow: var(--box-shadow-hover);
      opacity: 0.6;
    }

    &:active {
      box-shadow: var(--box-shadow-active);
    }
  }
  > span {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;

    > button {
      text-align: left;
      font-size: 20px;
      box-shadow: none;
      background: transparent;
      border: none;
      color: var(--title-color);
      transition: 0.25s;
      box-shadow: var(--box-shadow);
      padding: 16px;

      display: flex;
      align-items: center;
      justify-content: center;

      > svg {
        margin-left: auto;
      }

      &:hover {
        color: var(--primary-color);
        box-shadow: var(--box-shadow-hover);
        opacity: 0.6;
      }

      &:active {
        color: var(--title-color);
        box-shadow: var(--box-shadow-active);
      }
    }
  }

  > h2 {
    font-size: 20px;
    color: var(--primary-color);
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 250px;
    height: 100%;

    overflow-y: scroll;
    padding: 16px 16px 16px 0;
  }
`;
