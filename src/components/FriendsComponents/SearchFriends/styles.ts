import styled, { css } from 'styled-components';

interface IsActive {
  isActive: boolean;
}

export const Container = styled.div`
  flex: 1;
  height: 80px;
`;

export const InputContainer = styled.div<IsActive>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background-color: var(--letter-color-2);
  border: 1px solid var(--letter-color-4);
  border-radius: 16px;
  padding: 8px 16px;
  z-index: 3;
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
  width: 90%;
  background-color: var(--letter-color-2);
  border-bottom: 0.5px solid var(--letter-color-6);
  padding: 8px;
`;

export const CloseButton = styled.button`
  border-radius: 5px;
  background-color: var(--letter-color-2);
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  padding: 2px;
`;

export const SearchButton = styled.button`
  border-radius: 5px;
  background-color: var(--letter-color-2);
  align-items: center;
  justify-content: center;
  padding: 4px;
`;
