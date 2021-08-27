import styled from 'styled-components';

interface IsPaidParams {
  color: string;
}

export const Container = styled.div`
  width: 100%;
  padding: 8px;
  background-color: var(--letter-color-2);
  border: 0.5px solid var(--letter-color-3);
`;

export const FieldContainer = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
  min-height: 48px;
`;

export const CategoryContainer = styled.div`
  margin: 8px 0;
  width: 100%;
`;

export const FieldText = styled.p`
  font-size: 16px;
  color: var(--letter-color-6);
`;

export const FieldButtonText = styled.p`
  font-size: 16px;
  color: var(--letter-color-6);
`;

export const FieldLabel = styled.p`
  position: absolute;
  top: 0;
  left: 8px;
  font-size: 14px;
  color: var(--secondary-color);
`;

export const Label = styled.p`
  font-size: 16px;
  color: var(--letter-color-6);
  margin-top: 16px;
`;

export const FieldButton = styled.button`
  background-color: var(--letter-color-1);
  padding: 8px;
  border-radius: 8px;
  border: 0.5px solid var(--secondary-color);
  align-items: center;
  justify-content: center;
  min-width: 48%;
`;

export const PaidButton = styled.button<IsPaidParams>`
  background-color: ${({ color }) => color};
  min-width: 36%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid black;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  justify-content: space-around;
`;

export const DeleteButton = styled.button`
  background-color: var(--red-color);
  padding: 10px;
  border-radius: 8px;
  border: 1px solid black;
  align-items: center;
  justify-content: center;
`;

export const ReceiptButton = styled.button`
  background-color: var(--toast-info-background-color);
  padding: 10px;
  border-radius: 8px;
  border: 1px solid black;
  align-items: center;
  justify-content: center;
`;
