import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 16px;

  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  button {
    height: 40px;
    width: 100%;
    text-align: center;
    border: none;
    background: var(--primary-color);
    color: var(--secondary-color);
    transition: 0.4s;
    border-radius: 4px;
    box-shadow: var(--box-shadow);

    &:hover {
      background: var(--secondary-color);
      color: var(--primary-color);
      box-shadow: var(--window-box-shadow);
    }
  }
`;
