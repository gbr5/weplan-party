import styled, { css } from 'styled-components';

interface IAmountProps {
  isOverdue: boolean;
  isPaid: boolean;
}

interface IsContainerProps {
  isCancelled: boolean;
  isSelected: boolean;
}

export const OutContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px 0;
`;

export const Container = styled.button<IsContainerProps>`
  display: flex;
  position: relative;
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  margin: 4px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  ${({ isCancelled }) =>
    isCancelled &&
    css`
      opacity: 0.4;
    `}
`;

export const CancelledTransaction = styled.div`
  position: absolute;
  z-index: 5;
  top: 80%;
  left: 2%;
  height: 2px;
  width: 96%;
  background-color: var(--red-color);
  border-radius: 4px;
`;

export const TextContainer = styled.div`
  display: flex;
  width: 95%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 4px;
`;

export const Index = styled.p`
  color: var(--letter-color-6);
  font-size: 18px;
`;

export const Sign = styled.p`
  color: var(--letter-color-6);
  font-size: 22px;
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
  text-align: right;
  flex: 1;
`;

export const Name = styled.p`
  color: var(--secondary-color);
  font-size: 16px;
  text-align: left;
  flex: 1;
`;

export const DateText = styled.p`
  color: var(--letter-color-6);
  font-size: 18px;
`;

export const InfoButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  background-color: transparent;
`;

export const Underline = styled.div`
  width: 100%;
  height: 0.3px;
  background-color: var(--letter-color-4);
`;

export const DayContainer = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  /* background-color: var(--letter-color-6); */
  padding: 0 16px;
  margin-left: auto;
`;

export const YearContainer = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  position: absolute;
  top: 8px;
  left: 44%;
`;

export const MonthContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: var(--letter-color-6);
  border: 0.5px solid var(--letter-color-6);
  opacity: 0.5;
  z-index: 3;
  padding: 4px 8px;
  position: absolute;
  top: 0;
  left: 0px;
  border-radius: 8px;
  opacity: 0.95;
  width: 120px;
`;

export const Month = styled.p`
  color: var(--primary-color);
  font-size: 16px;
  z-index: 2;
  opacity: 1;
  letter-spacing: 1px;
  font-weight: 500;
`;

export const Day = styled.p`
  color: var(--letter-color-6);
  font-size: 16px;
`;

export const Year = styled.p`
  color: var(--primary-color);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
`;
