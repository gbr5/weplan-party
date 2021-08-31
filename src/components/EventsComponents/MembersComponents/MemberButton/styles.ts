import styled, { css } from 'styled-components';

interface IButtonProps {
  isActive: boolean;
}

export const Container = styled.button<IButtonProps>`
  flex-direction: row;
  align-items: center;
  ${({ isActive }) =>
    isActive
      ? css`
          background-color: var(--letter-color-2);
        `
      : css`
          background-color: var(--letter-color-1);
        `};
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  margin-top: 8px;
  border-radius: 8px;
  padding: 8px 0;
  width: 100%;
`;

export const Index = styled.p`
  font-size: 20px;
  color: var(--primary-color);
  text-align: center;
  width: 40px;
  margin: 0 8px;
`;

export const Name = styled.p`
  font-size: 18px;
  text-align: left;
  width: 70%;
  color: var(--letter-colo6);
`;
