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

  top: 7vh;
  height: 93vh;
  left: 0;
  width: 18vw;
  padding: 2vh 0;

  display: grid;
  align-items: center;
  justify-content: stretch;
  grid-template-rows: repeat(9, 1fr);
  border-radius: 0 8px 8px 0;

  animation: ${apearFromLeft} 0.8s;
  box-shadow: var(--box-shadow);

  background: var(--card-color);

  @media (max-width: 1000px) {
    width: 52vw;
    height: 92.5vh;
    top: 7.5vh;

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
  text-align: left;

  &:hover {
    color: var(--title-color);
    background: var(--secondary-color);
    /* background: rgba(255, 125, 5, 0.5); */
    /* box-shadow: var(--window-box-shadow); */

    button {
      color: var(--primary-color);
    }
  }

  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: stretch;
    background: transparent;
    border: none;
    height: 40px;
    gap: 2vw;
    text-align: left;
    padding-left: 2vw;

    @media (max-width: 1000px) {
      padding-left: 4vw;
    }

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
  justify-content: stretch;
  text-align: left;

  @media (max-width: 1000px) {
    padding-left: 2vw;
  }

  strong {
    font-size: 20px;
    color: black;
  }
`;

export const LogoutButton = styled.button`
  background: transparent;
  font-size: 20px;
  font-weight: 500;
  color: black;
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
