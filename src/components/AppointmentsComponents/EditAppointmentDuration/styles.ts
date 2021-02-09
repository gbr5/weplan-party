import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;

  gap: 4vh;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: var(--primary-color);
    color: var(--secondary-color);
    border: none;
    border-radius: 4px;

    &:hover {
      background: var(--secondary-color);
      color: var(--primary-color);
      box-shadow: var(--window-box-shadow);
    }
  }
`;
