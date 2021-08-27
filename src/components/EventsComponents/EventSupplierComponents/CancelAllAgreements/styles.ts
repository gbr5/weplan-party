import styled from 'styled-components';

interface IProps {
  isActive: boolean;
}

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TransactionTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const TransactionTitleButton = styled.button<IProps>`
  background-color: ${({ isActive }) =>
    isActive ? 'var(--primary-color)' : 'var(--secondary-color)'};
  border-radius: 8px;
  padding: 8px;
  margin: 0 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
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
  text-align: justify;
`;

export const AgreementsContainer = styled.div`
  position: relative;
  width: 100%;
  background: var(--letter-color-2);
  border-radius: 8px;
  padding: 8px 0;
  margin: 4px 0 8px;
  max-height: 100px;
  padding-right: 16px;
`;

export const AgreementContainer = styled.button<IProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ isActive }) =>
    isActive ? 'var(--primary-color)' : 'var(--secondary-color)'};
  border-radius: 8px;
  padding: 0 16px;
  margin: 0 8px;
  align-items: center;
  justify-content: center;
`;

export const AgreementButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AgreementIndex = styled.p<IProps>`
  color: ${({ isActive }) =>
    isActive ? 'var(--letter-color-5)' : 'var(--letter-color-1)'};

  font-size: 16px;
  position: absolute;
  top: 0px;
  left: 4px;
`;

export const AgreementDate = styled.p<IProps>`
  color: ${({ isActive }) =>
    isActive ? 'var(--letter-color-6)' : 'var(--primary-color)'};

  font-size: 16px;
  margin-top: 16px;
  letter-spacing: 1px;
`;

export const AgreementValue = styled.p<IProps>`
  color: ${({ isActive }) =>
    isActive ? 'var(--letter-color-6)' : 'var(--primary-color)'};
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1px;
  margin: 0 auto;
`;

export const NumberOfInstallments = styled.p<IProps>`
  color: ${({ isActive }) =>
    isActive ? 'var(--letter-color-6)' : 'var(--primary-color)'};

  font-size: 16px;
  letter-spacing: 1px;
  margin-left: 8px;
`;

export const SectionUnderline = styled.div`
  width: 80%;
  height: 1.3px;
  margin: 0 auto 16px;
  background-color: var(--letter-color-5);
`;

export const TransactionsContainer = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  overflow-x: scroll;
  width: 100%;
  height: 35%;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
  background-color: var(--letter-color-1);
`;
