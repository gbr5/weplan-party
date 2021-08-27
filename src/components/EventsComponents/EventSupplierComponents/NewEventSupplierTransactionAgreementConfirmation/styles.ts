import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  width: 100%;
  overflow-x: scroll;
`;

export const TransactionContainer = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  overflow-x: scroll;
  width: 100%;
  height: 60%;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
  background-color: var(--letter-color-1);
`;

export const Value = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: var(--letter-color-6);
  margin: 16px 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin: 0 0 32px;
`;

export const EndButton = styled.button`
  border-radius: 5px;
  background-color: var(--primary-color);
  flex-direction: row;
  padding: 4px;
  width: 45%;
  align-items: center;
  justify-content: center;
`;

export const CancelButton = styled.button`
  border-radius: 5px;
  background-color: var(--toast-error-background-color);
  flex-direction: row;
  padding: 4px;
  width: 45%;
  align-items: center;
  justify-content: center;
`;

export const EditButton = styled.button`
  border-radius: 5px;
  display: flex;
  background-color: var(--title-color);
  padding: 4px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
