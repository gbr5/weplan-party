import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import '../../styles/global';

import signInBackgroundImg from '../../assets/lotus_flower-by-Daniel_Holtzhouse.jpeg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);

  place-content: center;

  width: 100%;
  height: 100%;
  max-width: 700px;

  gap: 80px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  place-content: center;
  gap: 8px;
  height: 40px;

  width: 100%;

  div {
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: var(--secondary-color);
    border-radius: 8px;
    box-shadow: var(--window-box-shadow);
    transition: 0.3s;
    padding: 8px auto;
    font-weight: 500;

    a {
      color: var(--primary-color);
      text-decoration: none;
      transition: 0.3s;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: 8px;

      svg {
        color: var(--primary-color);
      }
    }

    &:hover {
      background: var(--primary-color);
      box-shadow: var(--box-shadow);

      a {
        color: var(--secondary-color);
        svg {
          color: var(--secondary-color);
        }
      }
    }
  }
`;

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

export const Slogan = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8px auto;
  box-shadow: var(--box-shadow);
  background: rgba(0, 0, 0, 0.2);

  h1 {
    display: flex;
    flex-direction: column;
    gap: 8px;

    color: var(--primary-color);

    text-shadow: var(--secondary-color);
  }
`;
export const LogoContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 32px;

  img {
    height: 64px;
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;

  place-content: center;

  animation: ${appearFromLeft} 0.5s;

  h1 {
    color: var(--primary-color);
    font-size: 80px;
  }

  form {
    margin: 40px 0;
    width: 340px;
    text-align: center;

    h1 {
      color: var(--title-color);
      margin-bottom: 24px;
      font-size: 32px;
    }

    a {
      color: var(--letter-color-5);
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.15s;
      border-radius: 4px;

      background: rgba(255, 105, 1, 0.4);
      box-shadow: var(--window-box-shadow);

      &:hover {
        /* color: ${shade(0.2, '#f4ede8')}; */
        color: var(--title-color);
        background: rgba(10, 10, 10, 0.4);
        box-shadow: var(--box-shadow);
      }
    }
  }

  > a {
    color: var(--primary-color);
    font-weight: 500;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.15s;
    font-size: 24px;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  margin: auto;
  z-index: -1;
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
