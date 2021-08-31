import styled, { css } from 'styled-components';
import '../../../styles/global';

interface IsActive {
  isActive: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 80px;
  width: 100%;
`;

export const InputContainer = styled.div<IsActive>`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background-color: var(--letter-color-1);
  border: none;
  border-radius: 16px;
  padding: 8px 16px;
  z-index: 3;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.2);
  ${({ isActive }) =>
    isActive &&
    css`
      box-shadow: 1px 1px 3px 3px rgba(0, 0, 0, 0.3);
    `}
`;

export const Input = styled.input`
  font-size: 18px;
  color: var(--letter-color-6);
  flex: 1;
  border-radius: 5px;
  padding: 8px;
  border: none;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.09);
  border-radius: 5px;
`;

export const CloseButton = styled.button`
  display: flex;
  border-radius: 5px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  padding: 8px;
  max-width: 40px;
  max-height: 40px;
  font-size: 28;
  margin-right: 16px;
  border: none;
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.3);
`;

export const SearchButton = styled.button`
  display: flex;
  border-radius: 5px;
  background-color: transparent;
  border: none;
  align-items: center;
  color: var(--letter-color-6);
  justify-content: center;
  padding: 8px;
  max-width: 40px;
  max-height: 40px;
  margin-left: 16px;
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.3);
`;
