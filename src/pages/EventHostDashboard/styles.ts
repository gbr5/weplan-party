import styled, { keyframes } from 'styled-components';
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

const appearFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-300px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const Container = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  animation: ${appearFromTop} 0.5s;

  margin-bottom: 4vh;
`;

export const EventPageContent = styled.main`
  position: relative;
  width: 100%;
  display: flex;
  padding: 0 80px;
  gap: 80px;
  animation: ${appearFromTop} 0.5s;

  @media (max-width: 1000px) {
    padding: 0 2vw;
    gap: 0;
  }

  > button {
    z-index: 5;
    background: transparent;
    border: none;
    border-radius: 8px;
    position: fixed;
    top: 100px;
    left: -8px;
    transition: 0.25s;

    color: var(--primary-color);

    &:hover {
      color: var(--letter-color-4);
    }
  }

  > span {
    > button {
      z-index: 5;
      background: transparent;
      border: none;
      border-radius: 8px;
      position: fixed;
      top: 100px;
      left: 22%;
      transition: 0.25s;

      color: var(--letter-color-4);
      animation: ${appearFromLeft} 0.5s;

      @media (max-width: 1000px) {
        left: 70%;
      }
      &:hover {
        color: var(--primary-color);
      }
    }
  }
`;

export const SideBar = styled.div`
  z-index: 5;
  position: fixed;
  top: 0px;
  left: 0;
  border-radius: 0 8px 8px 0;
  margin: 32px 0 0 0;
  background: var(--header-background-color);
  width: 22%;
  min-width: 220px;
  height: 100%;
  padding: 86px 16px 11px;
  display: flex;
  flex-direction: column;

  animation: ${appearFromLeft} 0.5s;

  @media (max-width: 1000px) {
    width: 70%;
    overflow-y: scroll;
    padding-bottom: 8vh;
  }

  > button {
    width: 100%;
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 16px;
    color: var(--letter-color-2);
    border: none;
    background: transparent;
    display: flex;
    align-items: flex-start;
    justify-content: left;
    position: relative;
    gap: 16px;

    > h5 {
      font-size: 22px;
      color: var(--title-color);
      display: flex;
      justify-content: center;
      align-items: unset;
      margin-top: 16px;
      margin-bottom: 16px;

      > svg {
        color: var(--title-color);
        opacity: 0.3;
      }
    }

    > h1 {
      left: 0;
      font-size: 20px;
      color: var(--primary-color);
      margin: 8px 0 4px;
      opacity: 0.9;
    }

    svg {
      position: absolute;
      color: var(--primary-color);
      right: 0;
      margin: 6px 0 4px;
    }

    &:hover {
      opacity: 0.8;

      > h5 {
        > svg {
          opacity: 1;
        }
      }
    }
  }
  span {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 16px;
    margin-bottom: 8px;

    > button {
      margin-top: 8px;
      margin-bottom: 8px;
      font-size: 16px;
      border: none;
      background: transparent;
      display: flex;
      align-items: flex-start;
      justify-content: center;

      &:hover {
        opacity: 0.8;
      }
      h2 {
        font-size: 18px;
        color: var(--letter-color-3);
      }

      h3 {
        font-size: 18px;
        color: var(--letter-color-2);
      }
    }

    p {
      margin-right: auto;
      margin-top: 8px;
      margin-top: 4px;
      font-size: 16px;
      color: var(--letter-color-2);
    }
  }
`;

export const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 150px;
  position: relative;

  > button {
    z-index: 5;
    position: fixed;
    top: 5vh;
    left: 47.7%;
    background: transparent;
    border: none;
    transition: 0.25s;

    > svg {
      color: var(--primary-color);
      transition: 0.25s;

      &:hover {
        color: var(--letter-color-4);
      }
    }
  }

  > span {
    > button {
      z-index: 5;
      position: absolute;
      top: 4vh;
      left: 47.5%;
      background: transparent;
      border: none;
      transition: 0.25s;
      animation: ${appearFromTop} 0.5s;

      > svg {
        color: var(--letter-color-4);
        transition: 0.25s;

        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }
`;

export const FirstRow = styled.div`
  position: absolute;
  top: -100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  gap: 80px;
  margin-top: 2vh;

  animation: ${appearFromTop} 0.5s;

  @media (max-width: 1000px) {
    overflow-x: scroll;
    display: inline-flexbox;
    width: 100%;
    border-radius: 0;
    align-items: stretch;
    justify-content: center;
  }
  div {
    display: flex;
    width: 130px;
    height: 130px;
    border: 3px solid var(--primary-color);
    background: var(--header-background-color);
    border-radius: 50%;
    align-items: center;
    justify-content: center;

    /* @media (max-width: 1000px) {
      border-radius: 8px;
    } */

    &:hover {
      opacity: 0.7;
    }

    button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;

      &:hover {
        opacity: 0.8;
      }

      h2 {
        font-size: 16px;
        color: var(--title-color);
        margin-bottom: 8px;
      }

      p {
        font-size: 16px;
        color: var(--letter-color-3);
      }
    }
  }
`;

export const BudgetDrawer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px;
  width: 100%;
  height: 100%;

  > span {
    background-color: rgba(255, 144, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--letter-color-3);
    margin: 8px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 16px;

    h2 {
      font-size: 16px;
      color: var(--title-color);
      margin-bottom: 8px;
    }

    input {
      border: 1px solid var(--primary-color);
      border-radius: 4px;
      height: 32px;
    }

    button {
      margin-left: auto;
      margin-top: 16px;
      background: transparent;
      padding: 8px;
      border-radius: 8px;
      border: none;

      > h3 {
        color: var(--title-color);
        font-size: 16px;
      }

      &:hover {
        border: 1px solid var(--title-color);
      }
    }

    &:hover {
      background-color: rgba(255, 144, 0, 0.15);
    }
  }
`;
