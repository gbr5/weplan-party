import styled from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: center;
  gap: 4vh;
  width: 100%;
  height: 100%;

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    overflow-y: scroll;
  }

  button {
    background: var(--primary-color);
    height: 50px;
    border-radius: 8px;
    width: 100%;
    border: none;
    font-size: 18px;
    font-weight: 500;
    color: var(--letter-color-5);
    box-shadow: var(--box-shadow);
    transition: 0.3s;

    &:hover {
      opacity: 0.8;
      box-shadow: var(--window-box-shadow);
      background: var(--secondary-color);
      color: var(--primary-color);
    }
  }
`;
