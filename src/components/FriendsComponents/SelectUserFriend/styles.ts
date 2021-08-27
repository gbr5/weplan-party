import styled, { css } from 'styled-components';

interface IsActive {
  isActive: boolean;
}

export const Container = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

export const UserButton = styled.button<IsActive>`
  ${({ isActive }) =>
    isActive
      ? css`
          background-color: var(--letter-color-2);
        `
      : css`
          background-color: var(--letter-color-1);
        `};
  padding: 8px;
  width: 100%;
  border-radius: 4px;
  border: 0.5px solid var(--letter-color-3);
  margin: 4px 0;
  flex-direction: row;
  align-items: center;
`;

const imageSize = 40;

export const Avatar = styled.img`
  border-radius: ${imageSize / 2}px;
  height: ${imageSize}px;
  width: ${imageSize}px;
  margin-right: 8px;
`;

export const UserButtonText = styled.p`
  color: var(--letter-color-6);
  font-size: 16px;
`;

export const UsersContainer = styled.div`
  flex: 1;
  width: 100%;
  padding: 8px 4px;
  border: 0.4px solid #e3e3e3;
  min-height: 65%;
`;
