import styled, { css } from 'styled-components';

export const Container = styled.div`
  flex: 1;
  margin: 40px 0 16px;
  width: 100%;
`;

export const Title = styled.p`
  color: var(--letter-color-6);
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 1px;
  text-align: center;
`;

export const TransactionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  width: 100%;
  height: 400px;
  flex: 1;
  border-radius: 8px;
  border: none;
  background-color: var(--letter-color-1);
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  overflow-y: scroll;
  padding: 8px;
`;
