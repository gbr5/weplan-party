import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import '../../styles/global';

import signUpBackgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  margin: 32px auto;

  place-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromNothing = keyframes`
  from {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  65% {
    opacity: 0.1;
  }
  75% {
    opacity: 0.15;
  }
  80% {
    opacity: 0.3;
  }
  90% {
    opacity: 0.4;
  }
  95% {
    opacity: 0.5;
  }
  97% {
    opacity: 0.6;
  }
  98% {
    opacity: 0.75;
  }
  99% {
    opacity: 0.95;
  }
  to {
    opacity: 1;
  }
`;

const appearFromDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-480px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  animation: ${appearFromDown} 1.2s;
  form {
    margin: 40px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: var(--letter-color-3);
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
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.15s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#FF9000')};
    }
  }
`;

export const Background = styled.div`
  position: absolute;
  /* top: 0; */
  margin: auto;
  z-index: -1;
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;
`;

export const SubContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  gap: 40px;
  animation: ${appearFromNothing} 1.6s;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 300px;
`;

export const ButtonContainerTitle = styled.div`
  color: var(--primary-color);
  font-size: 24px;
  text-align: center;
`;

export const QuestionTitle = styled.h2`
  color: var(--primary-color);
  font-size: 32px;
  margin-top: 40px;
  text-align: center;
`;

export const QuestionContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr;
  justify-content: center;
  align-items: center;
`;
