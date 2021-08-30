import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--letter-color-1);
  padding-top: 8px;
  top: -24px;
`;

export const FieldButton = styled.button`
  display: flex;
  background-color: var(--letter-color-1);
  padding: 8px;
  border-radius: 8px;
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: center;
  min-width: 48%;
`;

export const FieldLabel = styled.p`
  position: absolute;
  top: 0;
  left: 8px;
  font-size: 14px;
  color: var(--letter-color-4);
  font-weight: bold;
`;

export const Label = styled.p`
  font-size: 16px;
  color: var(--letter-color-6);
  margin-top: 16px;
  font-weight: bold;
`;
