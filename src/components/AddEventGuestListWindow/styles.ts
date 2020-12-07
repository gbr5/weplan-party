import { shade } from 'polished';
import styled from 'styled-components';
import '../../styles/global';

export const PageContainer = styled.span`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const BodyContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  gap: 16px;
  width: 100%;
  height: 100%;

  div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: 16px;
  }

  > label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: var(--primary-color);
    border-radius: 50%;
    bottom: 100px;
    left: 46.7%;
    right: 1%;
    border: none;
    transition: background-color 0.4s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    input {
      display: none;
    }

    svg {
      width: 24px;
      height: 24px;
      color: var(--letter-color-4);
    }

    &:hover {
      background-color: ${shade(0.3, '#ff9000')};
    }
  }

  button {
    border: none;
    margin-top: 200px;
    height: 40px;
    width: 100px;
    border-radius: 8px;
    background: var(--primary-color);
  }
`;

export const MenuButtonContainer = styled.div`
  display: flex;
  gap: auto;
  width: 100%;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    color: var(--red-color);
    font-weight: 500;
    font-size: 16px;

    margin: auto;

    padding: auto;
    border-radius: 5px;
    background: var(--title-color);
    box-shadow: var(--box-shadow);
    transition: 0.3s;

    height: 40px;
    width: 150px;
    &:hover {
      background: var(--red-color);
      box-shadow: var(--window-box-shadow);
      color: var(--title-color);
    }
  }
`;

export const BackButton = styled.button`
  background: rgba(24, 109, 9, 1);
  border-radius: 5px;
  border: none;
  box-shadow: var(--box-shadow);
  transition: 0.3s;
  margin: auto;
  height: 40px;
  width: 150px;
  font-weight: 500;
  font-size: 16px;

  &:hover {
    background: var(--primary-color);
    border: 1px solid var(--letter-color-5);
    box-shadow: var(--window-box-shadow);
  }
`;

export const JumpButton = styled.button`
  background: rgba(84, 109, 219, 1);
  border-radius: 5px;
  border: none;
  box-shadow: var(--box-shadow);
  transition: 0.3s;
  margin: auto;
  font-weight: 500;
  font-size: 16px;

  height: 40px;
  width: 150px;
  &:hover {
    background: var(--primary-color);
    border: 1px solid var(--letter-color-5);
    box-shadow: var(--window-box-shadow);
  }
`;

export const NextButton = styled.button`
  background: var(--primary-color);
  border-radius: 5px;
  border: none;
  box-shadow: var(--box-shadow);
  transition: 0.3s;
  margin: auto;
  font-weight: 500;
  font-size: 16px;

  height: 40px;
  width: 150px;
  &:hover {
    background: var(--title-color);
    border: 1px solid var(--letter-color-5);
    box-shadow: var(--window-box-shadow);
  }
`;
