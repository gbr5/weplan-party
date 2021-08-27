import styled from 'styled-components';

interface IsOverdueProps {
  isOverdue: boolean;
}

export const Container = styled.button`
  width: 100%;
  padding: 16px;
  background-color: var(--letter-color-6);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  margin: 8px 0;
`;

export const Index = styled.p`
  color: var(--primary-color);
  font-weight: bold;
  font-size: 15px;
  width: 10%;
`;

export const Body = styled.div`
  min-width: 70%;
`;

export const ContractInfo = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

export const SupplierName = styled.p`
  color: var(--letter-color-6);
  letter-spacing: 1px;
  font-size: 20px;
  text-align: left;
`;

export const Amount = styled.p`
  min-width: 60%;
  color: var(--letter-color-4);
  font-size: 20px;
  text-align: right;
`;

export const NumberOfInstallments = styled.p`
  color: var(--letter-color-4);
  font-size: 16px;
`;

export const IconContainer = styled.button`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 20%;
`;

export const PlusContainer = styled.div`
  background-color: var(--primary-color);
  border: 1px solid var(--letter-color-2);
  padding: 4px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const StatusContainer = styled.div<IsOverdueProps>`
  background-color: ${({ isOverdue }) =>
    isOverdue ? 'var(--red-color)' : 'var(--green-color)'};
  border: 0.2px solid var(--letter-color-3);
  padding: 4px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;
