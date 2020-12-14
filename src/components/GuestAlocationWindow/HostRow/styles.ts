import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  height: 40px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;

    > h1 {
      width: 100%;
      font-size: 24px;
      font-weight: 500;
      color: var(--background-color);
    }
    > h2 {
      width: 100%;
      font-size: 20px;
      color: var(--letter-color-4);
    }
  }

  button {
    box-shadow: var(--box-shadow);
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 100%;
    border-radius: 4px;

    &:hover {
      box-shadow: var(--window-box-shadow);
      background: var(--card-color);
      color: var(--background-color);
    }
  }
`;
