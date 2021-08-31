import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  padding-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const BudgetContainer = styled.div`
  flex: 1;
  max-height: 600px;
  margin: 8px 0;
  padding: 0 4px;
  padding-bottom: 32px;
  border-radius: 8px;
  border: none;
  background-color: var(--letter-color-1);
  display: flex;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  flex-direction: column;
  position: relative;
  overflow-y: scroll;
`;
