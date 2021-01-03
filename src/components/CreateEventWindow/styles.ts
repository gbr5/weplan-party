import styled from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 4vh;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > div {
    margin: auto 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16px;

    > h1 {
      font-size: 24px;
      color: var(--title-color);
      margin-bottom: 40px;
    }

    > button {
      height: 40px;
      width: 100%;
      border-radius: 4px;
      padding: 0 16px;
      border: none;
      margin: 16px;
      color: var(--primary-color);
      background: var(--secondary-color);
      box-shadow: var(--window-box-shadow);

      &:hover {
        background: var(--primary-color);
        color: var(--secondary-color);
        box-shadow: var(--box-shadow);
      }
    }

    span {
      position: absolute;
      top: 4px;
      right: 4px;
      > button {
        background: transparent;
        border: none;

        svg {
          color: red;
        }
      }
    }
    /*
    > input {
      height: 40px;
      width: 90%;
      border-radius: 4px;
      padding: 0 16px;
      border: none;
      margin: 16px;
    } */

    > p {
      margin-top: 32px;
      font-size: 20px;
      color: var(--primary-color);
    }

    div {
      display: flex;
      gap: 16px;
      margin-right: 16px;

      > input {
        height: 40px;
        width: 90%;
        border-radius: 4px;
        padding: 0 16px;
        border: none;
        margin: 16px;
      }
    }
  }

  > button {
    margin-top: 16px;
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 100%;
    border-radius: 4px;
  }
`;
