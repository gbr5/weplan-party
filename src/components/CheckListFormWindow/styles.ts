import styled, { css } from 'styled-components';
import '../../styles/global';

export const FriendsList = styled.form`
  top: 20%;
  z-index: 100000;
  left: 30%;
  position: fixed;
  height: 60%;
  width: 40%;
  background-color: var(--background-color);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 24px;
  overflow-y: scroll;

  > span {
    position: absolute;
    top: 4px;
    right: 4px;

    button {
      background: transparent;
      border: none;
      color: red;
    }
  }

  > div {
    display: flex;
    width: 100%;

    button {
      background-color: var(--green-icon);
      display: flex;
      justify-content: center;
      color: var(--letter-color-5);
      margin: 8px;
      border: 1px solid var(--primary-color);
      border-radius: 8px;
      padding: 16px;
      position: relative;
      box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);
      width: 100%;
      transition: 0.2s;

      > span {
        > svg {
          top: 13px;
          margin: auto;
        }
      }

      &:hover {
        opacity: 0.8;
        box-shadow: 2px 2px 5px 3px rgba(255, 150, 10, 0.3);
      }
    }
  }
`;

interface IPropsButton {
  selectedFriend: boolean;
}

export const FriendButton = styled.button<IPropsButton>`
  background-color: var(--primary-color);
  display: flex;
  justify-content: center;
  color: var(--letter-color-5);
  margin: 8px;
  border: 1px solid var(--primary-color);
  border-radius: 8px;
  padding: 16px;
  position: relative;
  box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);
  transition: 0.2s;

  > span {
    > svg {
      top: 13px;
      margin: auto;
    }
  }

  &:hover {
    opacity: 0.8;
    box-shadow: 2px 2px 5px 3px rgba(255, 150, 10, 0.3);
  }
  svg {
    margin-left: auto;
  }

  ${props =>
    props.selectedFriend &&
    css`
      color: var(--red-color);
      background-color: var(--title-color);
      opacity: 1;
      transition: 0.4s;
    `}
`;
