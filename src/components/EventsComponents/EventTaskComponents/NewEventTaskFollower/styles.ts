import styled from 'styled-components';

export const Container = styled.button`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  display: flex;
  padding: 16px;
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.3);
  max-height: 80px;
  margin-bottom: 8px;
  background-color: var(--letter-color-1);
`;

export const Name = styled.p`
  color: var(--letter-color-6);
  font-size: 20px;
`;
