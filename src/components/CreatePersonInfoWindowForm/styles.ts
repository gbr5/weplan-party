import styled, { keyframes } from 'styled-components';

const appearFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-1050px);
  }
  90% {
    opacity: 0.01;
    transform: translateY(-500px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const Container = styled.div`
  animation: ${appearFromTop} 3s;
  position: fixed;
  z-index: 100;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: var(--window-box-shadow);
  padding: 32px;

  > form {
    display: flex;
    width: 100%;
    height: 100%;
    gap: 32px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      gap: 24px;
    }
  }
`;

export const QuestionTitle = styled.h2`
  color: var(--title-color);
  font-size: 32px;
  margin: 32px auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  > strong {
    font-size: 40px;
    color: var(--primary-color);
  }
`;
