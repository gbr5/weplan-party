import styled, { css } from 'styled-components';

interface IsActiveProps {
  isActive: boolean;
}

export const Container = styled.div`
  min-height: 65%;
  width: 100%;
  position: relative;
`;

export const FilterButton = styled.button`
  position: absolute;
  top: -6%;
  left: 2%;
  z-index: 3;
  border-radius: 8px;
  background-color: var(--letter-color-1);
  align-items: center;
  justify-content: center;
  padding: 4px;
`;

export const IsCancelledButton = styled.button<IsActiveProps>`
  position: absolute;
  top: -9%;
  left: 2%;
  z-index: 3;
  border-radius: 8px;
  ${({ isActive }) =>
    isActive
      ? css`
          background-color: var(--secondary-color);
        `
      : css`
          background-color: var(--letter-color-1);
        `};
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
`;

export const Title = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: var(--letter-color-6);
  text-align: center;
  padding-bottom: 8px;
`;

export const TransactionContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  flex: 1;
  min-height: 320px;
  margin-top: 8px;
  padding-bottom: 32px;
  margin-bottom: 32px;
  background-color: #f3f2f2;
  border-radius: 8px;
  border: 0.4px solid #e1e0e0;
  overflow-y: scroll;
`;

export const Menu = styled.div`
  display: flex;
  overflow-x: scroll;
  flex-direction: row;
  width: 100%;
`;

export const MenuButton = styled.button<IsActiveProps>`
  width: 140px;
  height: 40px;
  border-radius: 5px;
  background-color: ${({ isActive }) =>
    isActive
      ? css`
          background-color: var(--primary-color);
        `
      : css`
          background-color: var(--secondary-color);
        `};
  padding: 8px;
  align-items: center;
  justify-content: center;
  margin: 0 4px;
`;

export const MenuTitle = styled.p<IsActiveProps>`
  color: ${({ isActive }) =>
    isActive
      ? css`
          color: var(--letter-color-6);
        `
      : css`
          color: var(--primary-color);
        `};
  font-size: 18px;
  font-weight: bold;
`;
