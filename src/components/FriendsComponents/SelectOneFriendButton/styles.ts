import styled, { css } from 'styled-components';

interface IProps {
  isSelected: boolean;
}

export const Container = styled.button<IProps>`
  display: flex;
  border-radius: 5px;
  border: none;
  ${({ isSelected }) =>
    isSelected
      ? css`
          background-color: var(--primary-color);
        `
      : css`
          background-color: var(--letter-color-1);
        `};
  flex-direction: row;
  align-items: center;
  padding: 8px;
  margin-top: 4px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  margin: 4px;
`;

const imageSize = 40;

export const Avatar = styled.img`
  border-radius: ${imageSize / 2}px;
  height: ${imageSize}px;
  width: ${imageSize}px;
  margin-right: 8px;
`;

export const Name = styled.p`
  color: var(--letter-color-6);
  font-size: 14px;
  flex: 1;
  text-align: left;
`;
