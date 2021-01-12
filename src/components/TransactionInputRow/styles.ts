import styled, { keyframes } from 'styled-components';
import '../../styles/global';

const appearFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-550px);
  }
  /* 40% {
    opacity: 0.5;
    transform: translateX(-100px);
  }
  80% {
    opacity: 0.9;
    transform: translateX(-50px);
  } */
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const TransactionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: stretch;
  background: var(--background-color);
  border-radius: 8px;
  gap: 4vw;
  padding: 4vw;
  margin: 4vh auto;

  animation: ${appearFromLeft} 0.5s;

  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 2vw;
  }

  > p {
    font-size: 18px;
    color: var(--title-color);

    @media (max-width: 1000px) {
      font-size: 14px;
    }
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: center;

    > p {
      width: 250px;
      font-size: 16px;
      color: var(--primary-color);

      @media (max-width: 1000px) {
        font-size: 13px;
        width: 100px;
      }
    }
  }
`;
