import styled, { css } from 'styled-components';
import '../../../styles/global';

interface IsActive {
  isActive: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 80px;
`;

export const InputContainer = styled.div<IsActive>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--letter-color-2);
  border: 1px solid var(--letter-color-4);
  border-radius: 16px;
  padding: 8px 16px;
  z-index: 3;
  left: 0;
  width: 100%;
  ${({ isActive }) =>
    isActive &&
    css`
      box-shadow: 1px 1px 3px 3px rgba(0, 0, 0, 0.3);
    `}
`;

export const Input = styled.input`
  font-size: 16px;
  color: var(--letter-color-6);
  flex: 1;
  border: none;
  background-color: var(--letter-color-2);
  border-bottom: 0.5px solid var(--letter-color-6);
  padding: 8px;
`;

export const CloseButton = styled.button`
  display: flex;
  border-radius: 5px;
  background-color: var(--letter-color-2);
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  padding: 2px;
  max-width: 40px;
  max-height: 40px;
  margin-right: 16px;
  border: 1px solid var(--letter-color-4);
`;

export const SearchButton = styled.button`
  display: flex;
  border-radius: 5px;
  background-color: var(--letter-color-1);
  border: 1px solid var(--letter-color-4);
  align-items: center;
  color: var(--letter-color-6);
  justify-content: center;
  padding: 8px;
  max-width: 40px;
  max-height: 40px;
  margin-left: 16px;
`;
