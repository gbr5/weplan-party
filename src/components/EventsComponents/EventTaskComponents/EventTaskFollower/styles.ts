import styled from 'styled-components';

export const Container = styled.button`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 4px 16px;
  max-height: 64px;
  margin-bottom: 8px;
  background-color: var(--letter-color-1);
  display: flex;
  padding: 16px;
  width: 100%;
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.3);
`;

export const Name = styled.p`
  color: var(--letter-color-6);
  font-size: 20px;
`;
