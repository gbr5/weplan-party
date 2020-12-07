import styled, { keyframes } from 'styled-components';

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
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1px;
  animation: ${appearFromTop} 0.5s;
`;

export const UsersChat = styled.div`
  display: grid;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  position: relative;

  > div {
    padding: 16px;
    border-radius: 8px;
    background-color: var(--header-background-color);
    box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    > h1 {
      width: 100%;
      margin-top: 3px;
      font-size: 24px;
      color: var(--primary-color);
      border-bottom: 1px solid var(--letter-color-2);
      padding-bottom: 8px;
    }
  }
`;

export const UserChat = styled.div`
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--letter-color-4);

  > h1 {
    font-size: 18px;
    color: var(--title-color);
  }

  > svg {
    margin-left: auto;
  }
`;

export const ChatMessages = styled.div`
  width: 100%;
  display: grid;
  align-items: flex-start;
  gap: 16px;
  position: relative;

  > div {
    width: 100%;

    padding: 16px;
    border-radius: 8px;
    background-color: var(--header-background-color);
    box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    > span {
      width: 100%;

      > button {
        margin-right: auto;
        background: transparent;
        border: none;

        > h1 {
          width: 100%;
          font-size: 24px;
          color: var(--primary-color);
          border-bottom: 1px solid var(--letter-color-2);
          padding-bottom: 8px;
        }
      }
    }

    button {
      width: 100%;
      height: 40px;
      background-color: var(--primary-color);
      opacity: 0.9;
      border: none;
      border-radius: 4px;
    }

    input {
      border: none;
      height: 40px;
      width: 100%;
      border-radius: 4px;
      background-color: var(--letter-color-4);
      color: var(--letter-color-2);
    }
  }
`;

export const Messages = styled.div`
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--letter-color-4);

  > p {
    font-size: 16px;
    color: var(--letter-color-1);
    margin-right: 16px;
  }
  > p + p {
    margin-left: auto;
  }
  > span {
    margin-right: 16px;
    color: var(--letter-color-3);
  }
`;
