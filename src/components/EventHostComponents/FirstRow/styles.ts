import styled, { keyframes, css } from 'styled-components';
import '../../../styles/global';

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

export const Container = styled.div`
  top: -100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-top: 2vh;
  overflow-x: scroll;
  animation: ${appearFromTop} 0.5s;
`;

export const MenuButton = styled.button<IProps>`
  display: flex;
  flex-direction: column;
  min-width: 130px;
  min-height: 88px;
  border: 0.3px solid var(--primary-color);
  background: var(--letter-color-1);
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 4px 16px 2px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.25);

  ${({ isActive }) =>
    isActive &&
    css`
      box-shadow: 0 0 4px 4px rgba(250, 120, 10, 0.25);
      background: var(--letter-color-2);
    `}

  &:hover {
    opacity: 0.8;
  }

  h2 {
    font-size: 16px;
    color: var(--primary-color);
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }

  p {
    font-size: 18px;
    color: var(--letter-color-6);
  }
`;
