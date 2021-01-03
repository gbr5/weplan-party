import styled from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 4vh;
  padding: 2vh;
  width: 100%;
  height: 100%;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
    margin: 40px auto;
  }

  > button {
    margin: 2vh 0;
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
    height: 2.5rem;
    width: 100%;
    border-radius: 4px;
    padding: 0 16px;
    border: none;
  }
`;
