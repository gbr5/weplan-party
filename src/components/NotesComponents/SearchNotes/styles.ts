import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const NumberOfTransactions = styled.p`
  font-size: 18px;
  color: var(--letter-color-6);
  text-align: center;
`;

export const InputContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background-color: var(--letter-color-1);
  border: 1px solid var(--letter-color-3);
  border-radius: 16px;
  padding: 8px 16px;
  z-index: 3;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
`;

export const Input = styled.textarea`
  font-size: 16px;
  color: var(--letter-color-6);
  flex: 1;
  border-radius: 5px;
  padding: 8px;
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
`;

export const CloseButton = styled.button`
  border-radius: 5px;
  background-color: var(--letter-color-1);
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  padding: 2px;
`;

export const SearchButton = styled.button`
  border-radius: 5px;
  background-color: var(--letter-color-1);
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: none;
  margin-left: 8px;
`;
