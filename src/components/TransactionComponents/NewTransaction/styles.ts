import styled, { css } from 'styled-components';

interface IAmountProps {
  isOverdue: boolean;
  isPaid: boolean;
}

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0px;
  flex-direction: row;
  margin: 8px 0 0;
`;

export const TextContainer = styled.div`
  display: flex;
  width: 86%;
  align-items: center;
  flex-direction: row;
`;

export const Index = styled.p`
  font-weight: bold;
  color: var(--primary-color);
  font-size: 16px;
  margin-right: 8px;
  min-width: 32px;
`;

export const AmountButton = styled.button`
  align-items: flex-end;
  justify-content: center;
  min-width: 65%;
  flex: 1;
  margin-right: 8px;
  border: none;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 8px;
  border-radius: 4px;
`;

export const DateButton = styled.button`
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.2);
`;

export const Amount = styled.p<IAmountProps>`
  text-align: right;
  color: var(--letter-color-6);
  font-size: 20px;
  ${({ isOverdue, isPaid }) =>
    !isPaid &&
    isOverdue &&
    css`
      color: var(--red-color);
      font-weight: bold;
    `};
  ${({ isPaid }) =>
    isPaid &&
    css`
      color: var(--green-color);
      font-weight: bold;
    `};
`;

export const DateText = styled.p`
  color: var(--secondary-color);
  font-size: 16px;
  letter-spacing: 1px;
  text-align: right;
`;

export const IsPaidButton = styled.button<IAmountProps>`
  display: flex;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
  background-color: var(--toast-info-background-color);
  ${({ isOverdue }) =>
    isOverdue &&
    css`
      background-color: var(--red-color);
    `};
  ${({ isPaid }) =>
    isPaid &&
    css`
      background-color: var(--toast-success-background-color);
    `};
  padding: 2px 2px 4px 4px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: none;
  margin: 0 12px 4px;
`;

export const Underline = styled.div`
  width: 100%;
  height: 1.1px;
  background-color: var(--secondary-color);
  margin: 8px 0;
`;
