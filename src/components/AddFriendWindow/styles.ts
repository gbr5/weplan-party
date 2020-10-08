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
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 32px;

  h1 {
    font-size: 24px;
    color: var(--primary-color);
    margin: 16px auto;
  }

  > input {
    position: absolute;
    top: 7%;
    left: 5%;
    height: 40px;
    width: 90%;
    border-radius: 8px;
    border: none;
    background: var(--card-color);
    color: var(--letter-color-5);
    padding-left: 16px;
  }

  > button {
    width: 100%;
    margin-top: 32px;
  }

  > ul {
    width: 100%;
    height: 100%;
    overflow-y: scroll;

    > li {
      display: flex;
      font-size: 16px;
      font-weight: 500;
      text-align: left;
      padding: 16px;
      transition: 0.3s;

      > button {
        margin-left: auto;
        width: 150px;
        transition: 0.3s;
      }

      > span {
        margin-left: auto;

        button {
          background: var(--background-color);
          color: var(--primary-color);
          width: 150px;
          transition: 0.3s;
        }
      }

      &:hover {
        opacity: 0.6;

        button {
          background: var(--background-color);
          color: var(--primary-color);
        }

        span {
          button {
            background: var(--primary-color);
            color: var(--background-color);
          }
        }
      }
    }
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
  align-items: center;
  justify-content: center;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: var(--window-box-shadow);
  padding: 32px;
  overflow-y: scroll;

  animation: ${appearFromTop} 0.5s;
`;
