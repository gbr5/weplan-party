import styled, { keyframes } from 'styled-components';
import '../../styles/global';

const appearFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-150px);
  }
  /* 40% {
    opacity: 0.5;
    transform: translateY(-100px);
  }
  80% {
    opacity: 0.9;
    transform: translateY(-50px);
  } */
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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
    @media (max-width: 800px) {
      display: flex;
      flex-direction: column;
    }
  }
`;

export const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;

  box-sizing: border-box;
  overflow-y: scroll;
  width: 100%;

  > h3 {
    margin: 8px auto 24px;
    font-size: 18px;
    color: var(--title-color);
    border-bottom: 1px solid var(--primary-color);
  }

  > div {
    border-bottom: 1px solid var(--letter-color-4);
    padding-bottom: 8px;
  }

  > ul {
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 8px;
    /* background: var(--card-color); */
    box-shadow: var(--window-box-shadow);

    > li {
      display: flex;
      font-size: 16px;

      > strong {
        color: var(--letter-color-4);
      }

      > span {
        display: flex;
        gap: 16px;
        margin-left: auto;

        > button {
          width: 40px;
          height: 40px;
        }
        div {
          > button {
            width: 40px;
            height: 40px;
          }
        }
      }
    }
  }
`;

export const GroupMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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

export const FriendGroupWindow = styled.div`
  position: fixed;
  margin: auto;
  z-index: 10000;
  display: flex;
  width: 40%;
  height: 80%;
  left: 30%;
  top: 10%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: var(--window-box-shadow);
  padding: 32px;
  overflow-y: scroll;

  animation: ${appearFromTop} 0.5s;

  > button {
    font-size: 24px;
    background: var(--primary-color);
    border: none;
    width: 100%;
    height: 40px;
    color: var(--letter-color-5);

    &:hover {
      background: var(--background-color);
      color: var(--primary-color);
      box-shadow: var(--window-box-shadow);
    }
  }
`;
