import styled, { keyframes } from 'styled-components';

const apearFromLeft = keyframes`
  0% {
    transform: translateX(-50vw);
    opacity: 0;
  }
  100% {
    transform: translateX(0vw);
    opacity: 1;
  }
`;

export const Container = styled.div`
  position: fixed;
  z-index: 5;

  top: 8.5vh;
  left: 0;

  height: 91.5vh;
  width: 30vw;

  display: flex;
  flex-direction: column;
  /* gap: 16px; */
  gap: 4vh;

  align-items: center;
  justify-content: center;
  text-align: left;

  animation: ${apearFromLeft} 0.8s;

  background: var(--letter-color-2);

  @media (max-width: 1000px) {
    /* display: block; */
    width: 90vw;
    height: 91vh;
    top: 9vh;

    gap: 4vh;

    overflow-y: scroll;
  }
`;

export const MenuItemContainer = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  height: 40px;

  align-items: center;
  justify-content: center;
  box-shadow: var(--box-shadow);
  text-align: left;

  &:hover {
    color: var(--title-color);
    background: var(--secondary-color);
    /* background: rgba(255, 125, 5, 0.5); */
    box-shadow: var(--window-box-shadow);

    button {
      color: var(--primary-color);
    }
  }

  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    height: 40px;
    gap: 2vw;
    text-align: left;

    h3 {
      text-align: left;
      font-size: 20px;
    }
  }
`;

export const ToggleButton = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;

  strong {
    font-size: 16px;
    color: var(--letter-color-5);
  }
`;

export const LogoutButton = styled.button`
  background: transparent;
  font-size: 16px;
  font-weight: 500;
  color: var(--letter-color-5);
  width: 100%;
  border: none;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  box-shadow: var(--box-shadow);
  padding: 16px;
  svg {
    margin-left: auto;
    color: var(--letter-color-5);
    transition: 0.3s;
    border-radius: 50%;
    border: 2px solid var(--letter-color-5);
    padding: 4px;
    background: rgba(250, 50, 10, 0.9);
    box-shadow: var(--box-shadow);
  }

  &:hover {
    border: 2px solid var(--red-color);
    border-radius: 4px;
    box-shadow: var(--window-box-shadow);
    background: var(--secondary-color);
    color: var(--primary-color);

    svg {
      box-shadow: var(--window-box-shadow);
      color: var(--letter-color-5);
      background: var(--primary-color);
      border: 2px solid var(--secondary-color);
    }
  }
`;
