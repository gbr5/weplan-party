import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import '../../styles/global';

import signInBackgroundImg from '../../assets/lotus_flower-by-Daniel_Holtzhouse.jpeg';

export const ActivationMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  padding: 2vw;
  gap: 4vh;

  h1 {
    color: var(--primary-color);
  }

  p {
    font-size: 20px;
  }

  button {
    background: var(--primary-color);
    color: var(--secondary-color);
  }
`;
export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
  max-width: 700px;
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
