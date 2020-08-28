import styled from 'styled-components';
import '../../styles/global';

export const UserProfileWindow = styled.div`
  position: fixed;
  z-index: 10;
  top: 150px;
  left: 400px;
  width: 600px;
  height: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;

  span {
    position: absolute;
    top: 4px;
    right: 4px;
    > button {
      background: transparent;
      border: none;

      svg {
        color: red;
      }
    }
  }

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > input {
    height: 40px;
    width: 90%;
    border-radius: 4px;
    padding: 0 16px;
    border: none;
  }

  button {
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 90%;
    border-radius: 4px;
  }
`;
