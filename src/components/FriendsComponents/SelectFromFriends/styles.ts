import styled, { css } from 'styled-components';

interface IProps {
  isSelected: boolean;
}

export const Container = styled.div`
  flex: 1;
  width: 100%;
`;

export const FriendsContainer = styled.div`
  flex: 1;
  width: 100%;
  padding: 8px 4px;
  border: 0.4px solid #e3e3e3;
  min-height: 55%;
`;

export const FriendButton = styled.button<IProps>`
  border-radius: 5px;
  border: 0.3px solid var(--letter-color-3);
  background-color: ${({ isSelected }) =>
    isSelected
      ? css`
          color: var(--letter-color-3);
        `
      : css`
          color: var(--primary-color);
        `};
  flex-direction: row;
  align-items: center;
  padding: 8px;
  margin-top: 4px;
`;

const imageSize = 40;

export const Avatar = styled.img`
  border-radius: ${imageSize / 2}px;
  height: ${imageSize}px;
  width: ${imageSize}px;
  margin-right: 8px;
`;

export const Name = styled.p`
  color: var(--letter-color-3);
  font-size: 14px;
  flex: 1;
  text-align: left;
`;
