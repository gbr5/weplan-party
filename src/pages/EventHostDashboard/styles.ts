import styled, { keyframes, css } from 'styled-components';
import '../../styles/global';

interface IProps {
  isActive: boolean;
}

const appearFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-150px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const appearFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-300px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const Container = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
  display: block;
  animation: ${appearFromTop} 0.5s;

  margin-bottom: 4vh;
`;

export const EventPageContent = styled.main`
  position: relative;
  width: 100%;
  display: flex;
  padding: 0 80px;
  animation: ${appearFromTop} 0.5s;

  @media (max-width: 1000px) {
    padding: 0 2vw;
  }
`;

export const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 144px;
  position: relative;
`;

export const SideMenuButton = styled.button<IProps>`
  z-index: 5;
  background: transparent;
  border: none;
  border-radius: 8px;
  position: fixed;
  top: 100px;
  left: -8px;
  transition: 0.25s;

  color: var(--primary-color);

  &:hover {
    color: var(--letter-color-4);
  }
  ${({ isActive }) =>
    isActive &&
    css`
      z-index: 5;
      background: transparent;
      border: none;
      border-radius: 8px;
      position: fixed;
      top: 100px;
      left: 22%;
      transition: 0.25s;

      color: var(--letter-color-1);
      animation: ${appearFromLeft} 0.5s;

      @media (max-width: 1000px) {
        left: 70%;
      }
      &:hover {
        color: var(--primary-color);
      }
    `}
`;
