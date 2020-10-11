import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  background: var(--header-background-color);
  border-radius: 8px;
  height: 600px;
  box-sizing: border-box;

  > h1 {
    color: var(--primary-color);
    font-size: 24px;
    border-bottom: 1px solid var(--title-color);
  }

  > span {
    display: flex;
    gap: 32px;
    align-items: center;
    justify-content: center;
    margin: 0;
    width: 100%;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      width: 100%;

      > div {
        background: var(--card-color);
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: center;
        height: 60px;
        width: 100%;
        border-radius: 8px;
        box-shadow: var(--window-box-shadow);

        > h3 {
          font-size: 20px;
          color: var(--letter-color-5);
        }

        > p {
          font-size: 20px;
          color: var(--letter-color-5);
        }
        > div:last-child() {
          color: var(--red-color);
        }
      }
    }
  }

  > div {
    display: flex;
    gap: 16px;
    width: 100%;
    height: 400px;
    box-sizing: border-box;
    padding-bottom: 32px;
  }
`;

export const Transaction = styled.div`
  display: flex;
  gap: 8px;
`;

export const Suppliers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;

  > h2 {
    font-size: 20px;
    color: var(--primary-color);
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 250px;
    height: 100%;

    overflow-y: scroll;
    padding: 16px 16px 16px 0;
  }
`;

interface SupplierButtonProps {
  booleanActiveButton: boolean;
}

export const SupplierButton = styled.button<SupplierButtonProps>`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  padding: 4px 8px;
  color: var(--letter-color-4);
  transition: 0.25s;

  &:hover {
    color: var(--primary-color);
  }

  ${props =>
    props.booleanActiveButton &&
    css`
      color: var(--primary-color);
      opacity: 1;
      transition: 0.25s;
      border-bottom: 1px solid var(--title-color);
    `}

  > p {
    font-size: 16px;
    font-weight: 500;
    color: var(--primary-color);
  }

  > h3 {
    font-size: 16px;
    font-weight: 500;
  }
`;

export const TransactionsWindow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 600px;
  box-sizing: border-box;
  overflow-y: scroll;

  > h3 {
    margin: 8px auto 24px;
    font-size: 18px;
    color: var(--title-color);
    border-bottom: 1px solid var(--primary-color);
  }

  > div {
    border-bottom: 1px solid var(--letter-color-4);
    padding-bottom: 8px;
  }
`;

interface ButtonProps {
  booleanActiveButton: boolean;
}

export const MenuButton = styled.button<ButtonProps>`
  background: transparent;
  border: none;
  color: var(--title-color);

  font-size: 24px;
  transition: 0.25s;

  &:hover {
    border-bottom: 1px solid var(--primary-color);
    color: var(--primary-color);
  }

  ${props =>
    props.booleanActiveButton &&
    css`
      color: var(--primary-color);
      opacity: 1;
      transition: 0.25s;
      border-bottom: 1px solid var(--title-color);
    `}
`;

export const SupplierTransactionAgreementsWindow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 300px;
`;

export const SupplierTransactionsWindow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 250px;
  box-sizing: border-box;
  overflow-y: scroll;

  > h3 {
    margin: 8px auto 24px;
    font-size: 18px;
    color: var(--title-color);
    border-bottom: 1px solid var(--primary-color);
  }

  > div {
    border-bottom: 1px solid var(--letter-color-4);
    padding-bottom: 8px;
  }
`;
