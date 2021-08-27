import styled, { css } from 'styled-components';

interface IAmountProps {
  isOverdue: boolean;
  isPaid: boolean;
}

interface IsActiveProps {
  isActive: boolean;
}

export const Container = styled.button`
  display: flex;
  width: 100%;
  padding: 4px 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextContainer = styled.div`
  display: flex;
  width: 87%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Index = styled.p`
  color: var(--letter-color-6);
  font-size: 15px;
  margin-right: 2px;
`;

export const Amount = styled.p<IAmountProps>`
  color: var(--letter-color-6);
  font-size: 18px;
  ${({ isOverdue, isPaid }) =>
    !isPaid &&
    isOverdue &&
    css`
      color: var(--red-color);
    `};
  ${({ isPaid }) =>
    isPaid &&
    css`
      color: var(--green-color);
    `};
`;

export const Status = styled.p<IAmountProps>`
  /* margin: 0 8px; */
  width: 27%;
  color: var(--info-toast-background-color);
  font-size: 15px;
  ${({ isOverdue, isPaid }) =>
    !isPaid &&
    isOverdue &&
    css`
      color: var(--red-color);
    `};
  ${({ isPaid }) =>
    isPaid &&
    css`
      color: var(--green-color);
    `};
`;

export const DateText = styled.p`
  font-weight: bold;
  color: var(--secondary-color);
  font-size: 16px;
`;

export const InfoButton = styled.button`
  padding: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
`;

export const Underline = styled.div`
  width: 100%;
  height: 1.1px;
  background-color: var(--secondary-color);
  margin: 8px 0;
`;
