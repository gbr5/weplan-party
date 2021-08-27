import styled from 'styled-components';

interface IOptionProps {
  isActive: boolean;
}

export const Container = styled.div`
  flex: 1;
  width: 100%;
  border-radius: 8px;
  background-color: var(--letter-color-4);
`;

export const OptionsContainer = styled.div``;

export const OptionButton = styled.button<IOptionProps>`
  width: 100%;
  padding: 16px 0;
  align-items: center;
  justify-content: center;
  background-color: ${({ isActive }) =>
    isActive ? 'var(--primary-color)' : 'var(--secondary-color)'};
  border-radius: 12px;
  margin: 8px 0;
`;

export const OptionText = styled.p<IOptionProps>`
  font-weight: bold;
  font-size: 19px;
  color: ${({ isActive }) =>
    isActive ? 'var(--letter-color-6)' : 'var(--letter-color-1)'};
`;
export const SupplierContainer = styled.div`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0;
`;

export const SupplierTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: var(--letter-color-6);
  margin-top: 8px;
  text-align: center;
`;

export const SupplierTitleUnderline = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: var(--primary-color);
`;

export const SupplierQuestion = styled.p`
  font-size: 18px;
  color: var(--letter-color-4);
`;

export const SupplierResponse = styled.p`
  font-weight: bold;
  font-size: 18px;
  color: var(--letter-color-6);
`;
