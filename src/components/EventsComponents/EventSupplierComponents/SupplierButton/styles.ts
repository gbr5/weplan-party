import styled from 'styled-components';

interface ISupplierProps {
  isHired: boolean;
}

interface IButtonProps {
  isActive: boolean;
}

export const Container = styled.button<IButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ isActive }) =>
    isActive ? 'var(--letter-color-3)' : 'var(--letter-color-1)'};
  border: 0.5px solid var(--letter-color-3);
  margin-top: 8px;
  border-radius: 8px;
  padding: 8px 0;
  width: 100%;
  height: 64px;
  margin: 0 auto;
  padding-right: 16px;
`;

export const SupplierIndex = styled.p`
  font-size: 18px;
  color: var(--primary-color);
  text-align: center;
  width: 40px;
`;

export const SupplierName = styled.p`
  font-size: 24px;
  text-align: left;
  flex: 1;
  color: var(--letter-color-6);
`;
