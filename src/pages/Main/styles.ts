import styled, { keyframes } from 'styled-components';
import '../../styles/global';

import backImage from '../../assets/lotus_flower-by-Daniel_Holtzhouse.jpeg';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-80px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const appearFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-200px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const appearFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(200px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  height: 100vh;
  background: url(${backImage});
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10%;

  padding: 32px;

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
    height: 160px;
    width: 100%;

    gap: 32px;

    border-radius: 8px;

    > img {
      height: 80px;
      animation: ${appearFromTop} 0.5s;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
  max-width: 700px;
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  animation: ${appearFromLeft} 0.5s;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20%;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.6);
      height: 160px;
      width: 500px;
      gap: 40px;
      transition: 0.25s;

      border-radius: 8px;

      img {
        width: 40px;
        height: 40px;
      }

      &:first-child {
        background: rgba(150, 250, 100, 0.8);
      }

      &:nth-child(2) {
        background: rgba(250, 150, 20, 0.8);
      }

      &:hover {
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.8);

        &:first-child {
          a {
            color: var(--title-color);
            svg {
              color: rgba(250, 150, 20, 0.8);
            }
          }
        }

        &:nth-child(2) {
          a {
            color: var(--title-color);
          }
        }

        > a {
          color: var(--title-color);
        }
      }

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        color: var(--letter-color-5);
        font-weight: 500;
        display: block;
        text-decoration: none;
        transition: color 0.15s;
        font-size: 40px;

        display: flex;
        align-items: center;

        animation: ${appearFromBottom} 0.5s;

        svg {
          margin-right: 16px;
        }
        img {
          margin-right: 16px;
        }
      }
    }
  }

  @media (max-width: 1200px) {
    div {
      flex-direction: column;
      gap: 24px;

      div {
        height: 64px;
        width: 400px;
      }
    }
  }
`;

export const Slogan = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  height: 100px;
  width: 600px;
  margin-bottom: 32px;

  border-radius: 8px;

  > h1 {
    color: var(--primary-color);
    font-size: 32px;
    animation: ${appearFromTop} 0.5s;
  }
`;
