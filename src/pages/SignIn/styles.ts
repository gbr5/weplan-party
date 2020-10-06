import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import '../../styles/global';

import signInBackgroundImg from '../../assets/signInImage1.jpg';

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

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
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
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
