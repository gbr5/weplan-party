import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import '../../styles/global';

import backImage from '../../assets/mainPageImage.jpeg';

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

const appearFromDown = keyframes`
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
  gap: 32px;

  padding: 32px;

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    height: 160px;
    width: 640px;
    margin-bottom: 160px;

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
  height: 100%;
  max-width: 700px;

  > span {
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    height: 160px;
    width: 800px;
    margin-bottom: 100px;

    border-radius: 8px;

    > h1 {
      color: var(--primary-color);
      font-size: 40px;
      animation: ${appearFromTop} 0.5s;
    }
  }
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
    gap: 40px;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.3);
      height: 160px;
      width: 800px;
      margin-bottom: 160px;
      gap: 40px;

      border-radius: 8px;

      &:hover {
        background: rgba(0, 0, 0, 0.5);
      }

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        color: var(--primary-color);
        font-weight: 500;
        display: block;
        text-decoration: none;
        transition: color 0.15s;
        font-size: 40px;

        display: flex;
        align-items: center;

        svg {
          margin-right: 16px;
        }
        img {
          margin-right: 16px;
        }

        &:hover {
          color: ${shade(0.2, '#ff9000')};
        }
      }
    }
  }
`;
