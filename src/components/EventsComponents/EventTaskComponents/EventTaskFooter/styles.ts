import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  margin-top: 8px;
  flex-direction: row;
`;

export const DateTime = styled.p`
  color: var(--secondary-color);
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
`;

export const PriorityButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  border-radius: 5px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  border: none;
`;

export const Legend = styled.p`
  color: var(--letter-color-6);
  font-size: 18px;
  letter-spacing: 1px;
`;
