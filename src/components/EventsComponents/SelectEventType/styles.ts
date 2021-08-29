import styled, { css } from 'styled-components';
import '../../../styles/global';

interface IButtonProps {
  isActive: boolean;
}

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 16px;
`;

export const EventTypeButton = styled.button<IButtonProps>`
  border-radius: 5px;
  ${({ isActive }) =>
    isActive
      ? css`
          background-color: var(--secondary-color);
        `
      : css`
          background-color: var(--primary-color);
        `};
  padding: 16px;
  margin-top: 16px;
  align-items: center;
  border: none;
`;

export const EventTypeButtonText = styled.p<IButtonProps>`
  color: ${({ isActive }) =>
    isActive
      ? css`
          background-color: var(--letter-color-1);
        `
      : css`
          background-color: var(--letter-color-6);
        `};
  font-size: 20px;
  font-weight: bold;
`;

export const Title = styled.p`
  padding: 5px;
  font-size: 20px;
  color: var(--secondary-color);
  font-weight: bold;
`;
