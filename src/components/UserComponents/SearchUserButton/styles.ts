import styled, { css } from 'styled-components';

interface IProps {
  isFriend: boolean;
  friendshipRequested: boolean;
}

export const Container = styled.div<IProps>`
  width: 100%;
  background-color: var(--letter-color-1);
  ${({ friendshipRequested }) =>
    friendshipRequested
      ? css`
          border: 0.5px solid var(--title-color);
        `
      : css`
          border: 0.5px solid var(--letter-color-3);
        `};
  ${({ isFriend }) =>
    isFriend &&
    css`
      border: 0.5px solid var(--primary-color);
    `}
  ${({ friendshipRequested }) =>
    friendshipRequested
      ? css`
          background-color: var(--letter-color-2);
        `
      : css`
          background-color: var(--primary-color);
        `};
  ${({ isFriend }) =>
    isFriend &&
    css`
      background-color: var(--letter-color-1);
    `}
  display: flex;

  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: 5px;
  margin: 4px 0;
  z-index: 2;
`;

export const Name = styled.p`
  color: var(--letter-color-6);
  font-size: 18px;
  flex: 1;
  text-align: left;
`;

export const FriendButtonText = styled.p`
  color: var(--letter-color-6);
  font-size: 16px;
`;

const imageSize = 60;

export const Avatar = styled.img`
  border-radius: ${imageSize / 2}px;
  height: ${imageSize}px;
  width: ${imageSize}px;
  margin-right: 8px;
`;

export const FriendButton = styled.button<IProps>`
  ${({ friendshipRequested }) =>
    friendshipRequested
      ? css`
          background-color: var(--title-color);
        `
      : css`
          background-color: var(--letter-color-1);
        `};
  ${({ isFriend }) =>
    isFriend &&
    css`
      background-color: var(--primary-color);
    `}
  padding: 8px;
  border: 0.3px solid var(--letter-color-3);
  border-radius: 4px;
  width: 80px;
  align-items: center;
  justify-content: center;
`;

export const InfoButton = styled.button`
  padding: 4px;
  border: none;
  margin-left: 16px;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  align-self: center;
  justify-content: center;
`;
