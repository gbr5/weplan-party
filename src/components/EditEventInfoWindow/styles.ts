import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    > div {
      display: flex;
      flex-direction: column;
      gap: 16px;
      > input {
        height: 40px;
        width: 100%;
        border-radius: 4px;
        padding: 0 16px;
        border: none;
      }
    }
  }

  button {
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 91.5%;
    border-radius: 4px;
  }
`;
