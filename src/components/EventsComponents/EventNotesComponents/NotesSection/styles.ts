import styled, { keyframes, css } from 'styled-components';
import '../../../../styles/global';

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
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  animation: ${appearFromTop} 0.5s;

  > h1 {
    color: var(--primary-color);
    font-size: 32px;
    line-height: 42px;
    border-bottom: 1px solid var(--primary-color);
    display: block;
    margin-bottom: 32px;
    padding-bottom: 16px;
  }

  > h3 {
    font-size: 24px;
    color: var(--text-color);
    margin: 0 auto;
  }

  > span {
    width: 100%;
    > span {
      position: absolute;
      top: 0px;
      right: 24px;

      > button {
        top: -16px;
        right: 0;
        width: 50px;
        height: 50px;
        position: absolute;
        background: transparent;
        border-radius: 50%;
        border: 1px solid var(--title-color);
        color: var(--title-color);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.3s;
        margin-left: auto;

        &:hover {
          background: var(--primary-color);
          border-radius: 5%;
          border: 1px solid var(--title-color);
          box-shadow: var(--window-box-shadow);

          > svg {
            color: var(--background-color);
          }
        }
      }
    }
  }

  > div {
    width: 100%;
    height: 400px;
    display: block;
    max-height: 500px;
    padding: 16px;
    gap: 8px;
    background: var(--header-background-color);
    border-radius: 8px;
    overflow-y: scroll;
    padding-bottom: 24px;

    @media (max-width: 1000px) {
      display: block;
    }
  }
`;
