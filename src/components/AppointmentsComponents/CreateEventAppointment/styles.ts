import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: stretch;

  gap: 4vh;

  width: 100%;

  strong {
    width: 100%;
    font-size: 24px;
    color: var(--primary-color);
  }

  button {
    background: var(--primary-color);
    color: var(--secondary-color);
    border: none;
    border-radius: 4px;
    height: 40px;
    width: 100%;
    box-shadow: var(--box-shadow);
    transition: 0.3s;

    &:hover {
      background: var(--secondary-color);
      color: var(--primary-color);
      box-shadow: var(--window-box-shadow);
    }
  }
`;

export const SelectFriendWindowContainer = styled.div`
  div {
    span {
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;

  align-items: center;
  justify-content: stretch;

  gap: 4vh;
  width: 100%;

  button {
    background: var(--primary-color);
    color: var(--secondary-color);
    border: none;
    border-radius: 4px;
    height: 40px;
    width: 100%;
    box-shadow: var(--box-shadow);
    transition: 0.3s;

    &:hover {
      background: var(--secondary-color);
      color: var(--primary-color);
      box-shadow: var(--window-box-shadow);
    }
  }
`;
