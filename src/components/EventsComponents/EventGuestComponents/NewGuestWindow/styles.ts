import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  width: 100%;
  margin: 40px 0;
`;

export const Button = styled.button`
  background-color: var(--letter-color-1);
  padding: 8px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 8px 0;
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
`;

export const ButtonTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: var(--letter-color-6);
`;
