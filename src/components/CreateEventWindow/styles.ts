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
  padding: 4vh;
  width: 100%;
  height: 100%;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
    margin: 40px auto;
  }

  > button {
    height: 40px;
    width: 100%;
    border-radius: 4px;
    border: none;
    color: var(--secondary-color);
    background: var(--primary-color);
    box-shadow: var(--window-box-shadow);

    &:hover {
      background: var(--secondary-color);
      color: var(--primary-color);
      box-shadow: var(--box-shadow);
    }
  }

  > input {
    height: 40px;
    width: 100%;
    border-radius: 4px;
    padding: 0 16px;
    border: none;
  }
`;
