import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  align-items: center;
  flex-direction: center;
  position: relative;
  margin: 0.2rem auto;
  text-align: center;

  input {
    padding-left: 8px;
    width: 100%;
  }

  > span {
    position: absolute;
    top: -2rem;
    left: 48%;

    > button {
      color: red;
      border: none;
      background: transparent;
    }
  }

  > button {
    background: var(--letter-color-1);
    border: none;
    box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: rgba(10, 95, 10);
    font-weight: bold;
  }
`;
