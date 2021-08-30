import styled from 'styled-components';

interface IsPaidParams {
  color: string;
}

export const Container = styled.div`
  top: -16px;
  position: relative;
  width: 100%;
  padding: 8px;
  padding-top: 24px;
  background-color: var(--letter-color-2);
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
`;

export const FirstContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
  min-height: 48px;
  position: relative;
`;

export const CategoryContainer = styled.div`
  position: relative;
  display: flex;
  width: 99%;
  align-items: center;
  justify-content: space-around;
  margin: 8px 0;
  padding-top: 16px;
  border-radius: 5px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  background-color: var(--letter-color-1);
  margin: 4px;
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
  top: 4px;
  left: 8px;
  font-size: 14px;
  color: var(--secondary-color);
`;

export const Label = styled.p`
  font-size: 16px;
  color: var(--letter-color-6);
  margin-top: 16px;
`;

export const MainButton = styled.button`
  background-color: var(--letter-color-1);
  padding: 8px;
  border-radius: 8px;
  border: 0.5px solid var(--secondary-color);
  align-items: center;
  justify-content: center;
  min-width: 100%;
  position: relative;
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
`;
export const FieldButton = styled.button`
  background-color: var(--letter-color-1);
  padding: 8px;
  border-radius: 8px;
  border: 0.5px solid var(--secondary-color);
  align-items: center;
  justify-content: center;
  min-width: 48%;
  position: relative;
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
`;

export const PaidButton = styled.button<IsPaidParams>`
  display: flex;
  background-color: ${({ color }) => color};
  min-width: 36%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid black;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  justify-content: space-around;
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
`;

export const DeleteButton = styled.button`
  background-color: var(--red-color);
  padding: 10px;
  border-radius: 8px;
  border: 1px solid black;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
`;

export const ReceiptButton = styled.button`
  background-color: var(--toast-info-background-color);
  padding: 10px;
  border-radius: 8px;
  border: 1px solid black;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
`;
