import styled from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  position: fixed;
  z-index: 10;
  top: 20%;
  left: 25%;
  width: 50%;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;

  > button {
    position: absolute;
    top: 4px;
    right: 4px;
    background: transparent;
    border: none;

    svg {
      color: red;
    }
  }

  > div {
    display: flex;
    width: 100%;
    height: 100%;
  }
`;
