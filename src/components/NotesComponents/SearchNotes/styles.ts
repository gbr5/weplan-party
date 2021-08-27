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
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background-color: var(--letter-color-1);
  border: 1px solid var(--letter-color-3);
  border-radius: 16px;
  padding: 8px 16px;
  z-index: 3;
`;

export const Input = styled.textarea`
  font-size: 16px;
  color: var(--letter-color-1);
  flex: 1;
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
`;
