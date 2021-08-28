import styled, { keyframes } from 'styled-components';
import '../../../styles/global';

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

export const Container = styled.div`
  top: -100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  position: relative;
  margin-top: 2vh;
  overflow-x: scroll;

  animation: ${appearFromTop} 0.5s;

  @media (max-width: 1000px) {
    overflow-x: scroll;
    width: 100%;
    align-items: stretch;
    justify-content: space-between;
    border-radius: 0;
  }

  button {
    display: flex;
    flex-direction: column;
    min-width: 130px;
    min-height: 130px;
    border: 0.3px solid var(--primary-color);
    background: var(--letter-color-1);
    border-radius: 10%;
    align-items: center;
    justify-content: center;
    margin: 8px 16px;
    box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);

    &:hover {
      opacity: 0.8;
    }

    h2 {
      font-size: 16px;
      color: var(--primary-color);
      font-weight: bold;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }

    p {
      font-size: 18px;
      color: var(--letter-color-6);
    }
  }
`;
