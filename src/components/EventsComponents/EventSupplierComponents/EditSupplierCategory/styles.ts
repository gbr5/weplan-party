import styled, { css } from 'styled-components';

interface ICategoryProps {
  isActive: boolean;
}

export const Container = styled.div`
  margin-top: 40px;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.p`
  color: var(--letter-color-6);
  font-size: 24px;
`;

export const CategoryButton = styled.button<ICategoryProps>`
  background-color: var(--letter-color-1);
  ${({ isActive }) =>
    isActive &&
    css`
      background-color: var(--letter-color-1);
      font-weight: bold;
    `};
  border: 0.5px solid var(--letter-color-2);
  border-radius: 5px;
  margin: 8px;
  padding: 12px;
  align-items: center;
  justify-content: center;
`;

export const CategoryButtonText = styled.p<ICategoryProps>`
  color: var(--letter-color-6);
  ${({ isActive }) =>
    isActive &&
    css`
      color: var(--primary-color);
    `};
  font-size: 18px;
  letter-spacing: 1px;
`;
