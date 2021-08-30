import styled from 'styled-components';

interface IProps {
  isActive: boolean;
}

export const Container = styled.div`
  flex: 1;
  width: 100%;
`;

export const TransactionTitleContainer = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 8px;
`;

export const TransactionTitleButton = styled.button<IProps>`
  background-color: ${({ isActive }) =>
    isActive ? 'var(--primary-color)' : 'var(--letter-color-5)'};
  border-radius: 8px;
  padding: 8px;
  margin: 0 8px;
  align-items: center;
  justify-content: center;
`;

export const TransactionTitleText = styled.p<IProps>`
  color: ${({ isActive }) =>
    isActive ? 'var(--letter-color-6)' : 'var(--primary-color)'};
  font-size: 18px;
`;

export const Title = styled.p`
  color: var(--letter-color-6);
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 1px;
  text-align: center;
`;

export const AgreementsContainer = styled.div`
  width: 100%;
  background: var(--letter-color-2);
  border-radius: 8px;
  padding: 8px 0;
  margin: 16px 0;
  max-height: 120px;
  padding-right: 16px;
`;

export const AgreementContainer = styled.button<IProps>`
  background-color: ${({ isActive }) =>
    isActive ? 'var(--primary-color)' : 'var(--letter-color-5)'};
  border-radius: 8px;
  padding: 16px;
  margin: 0 8px;
  align-items: center;
  justify-content: center;
`;

export const AgreementButton = styled.button`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AgreementIndex = styled.p<IProps>`
  color: ${({ isActive }) =>
    isActive ? 'var(--letter-color-4)' : 'var(--letter-color-1)'};
  font-size: 18px;
  position: absolute;
  top: 0px;
  left: 4px;
`;

export const AgreementDate = styled.p<IProps>`
  color: ${({ isActive }) =>
    isActive ? 'var(--letter-color-6)' : 'var(--primary-color)'};
  font-size: 18px;
`;

export const AgreementValue = styled.p<IProps>`
  color: ${({ isActive }) =>
    isActive ? 'var(--letter-color-6)' : 'var(--primary-color)'};
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 1px;
  margin: 0 auto;
`;

export const NumberOfInstallments = styled.p<IProps>`
  color: ${({ isActive }) =>
    isActive ? 'var(--letter-color-6)' : 'var(--primary-color)'};
  font-size: 18px;
  letter-spacing: 1px;
`;

export const SectionUnderline = styled.div`
  width: 80%;
  height: 1.3px;
  margin: 0 auto 16px;
  background-color: var(--letter-color-4);
`;

export const TransactionsContainer = styled.div`
  width: 100%;
  height: 550px;
  margin-top: 16px;
  border-radius: 8px;
  border: none;
  background-color: var(--letter-color-1);
  padding: 8px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  overflow-y: scroll;
`;
