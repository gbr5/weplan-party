import styled from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 4vh;
  text-align: center;
  width: 100%;

  h2 {
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

export const Roll = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 4vh;
`;
