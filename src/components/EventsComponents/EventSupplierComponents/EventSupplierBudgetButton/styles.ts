import styled from 'styled-components';

export const OverContainer = styled.div`
  margin-top: 8px;
  width: 100%;
`;

export const Container = styled.button`
  width: 100%;
  z-index: 2;
  padding: 8px 16px;
  border-radius: 5px;
  border: none;
  background-color: var(--letter-color-1);
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  position: relative;
`;

export const Row = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
`;

export const Amount = styled.p`
  font-size: 20px;
  color: var(--letter-color-6);
  text-align: right;
  flex: 1;
  padding: 0 16px;
`;

export const DueDate = styled.p`
  font-size: 16px;
  color: var(--secondary-color);
  text-align: center;
`;

export const Index = styled.p`
  font-weight: bold;
  font-size: 16px;
  color: var(--primary-color);
  text-align: center;
`;
