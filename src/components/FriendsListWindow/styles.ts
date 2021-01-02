import styled, { css } from 'styled-components';
import '../../styles/global';

export const FriendsContainer = styled.span`
  display: grid;
  grid-template-rows: 1fr 5fr 1fr;
  gap: 24px;
  width: 100%;
  height: 100%;

  > h1 {
    font-size: 40px;
    color: var(--title-color);
  }
`;

export const FriendsList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;

  @media (max-width: 1000px) {
    display: block;
    overflow-y: scroll;
  }
`;

export const SaveButton = styled.div`
  button {
    background-color: var(--green-icon);
    display: flex;
    justify-content: center;
    color: var(--letter-color-5);
    margin: 8px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 8px;
    position: relative;
    box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);
    width: 100%;
    transition: 0.25s;
    font-size: 24px;
    font-weight: 500;

    &:hover {
      opacity: 0.8;
      box-shadow: 2px 2px 5px 3px rgba(255, 150, 10, 0.3);
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
  align-items: center;
  color: var(--letter-color-5);
  margin: 8px;
  border: 1px solid var(--primary-color);
  border-radius: 8px;
  padding: auto;
  position: relative;
  box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);
  transition: 0.25s;
  width: 200px;
  height: 40px;

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
      transition: 0.25s;
    `}
`;
