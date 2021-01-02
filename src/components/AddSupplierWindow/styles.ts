import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 8vh;
  width: 100%;
  height: 100%;
  padding-top: 10vh;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
    width: 100%;

    button {
      background: var(--primary-color);
      border: none;
      height: 40px;
      width: 100%;
      border-radius: 4px;
    }
  }

  > input {
    height: 40px;
    width: 100%;
    border-radius: 4px;
    padding-left: 16px;
    border: none;
  }

  button {
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 100%;
    border-radius: 4px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 2vh;

  h3 {
    font-size: 16px;
    color: var(--title-color);
  }

  > input {
    height: 40px;
    width: 100%;
    border-radius: 4px;
    padding-left: 16px;
    border: none;
  }
`;
