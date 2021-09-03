import styled, { css } from 'styled-components';

interface IProps {
  isHired: boolean;
}

interface IBackgroundColor {
  color: string;
}

export const Container = styled.div`
  top: -8px;
  z-index: 1;
  width: 99%;
  background-color: var(--letter-color-1);
  margin: 0 auto 8px;
  border-radius: 5px;
  padding: 8px;
  /* border: 1.5px solid black; */
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  position: relative;
`;

export const DescriptionContainer = styled.button`
  border: none;
  background-color: var(--letter-color-1);
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  width: 100%;
  padding: 8px;
  margin: 4px;
  padding-top: 24px;
`;

export const DescriptionButton = styled.button`
  border: none;
  background-color: var(--letter-color-1);
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  width: 100%;
  padding: 8px;
  margin: 4px;
`;

export const GoToButton = styled.button`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const Name = styled.p`
  font-weight: bold;
  font-size: 20px;
  text-align: left;
  color: var(--letter-color-6);
  margin: 8px 0;
  text-align: center;
`;

export const ConfirmationButton = styled.button<IProps>`
  flex-direction: row;
  border-radius: 8px;
  width: 100%;
  padding: 8px;
  align-items: center;
  justify-content: space-evenly;
  background-color: var(--red-color);
  border: 1px solid var(--primary-color);

  ${({ isHired }) =>
    isHired &&
    css`
      background-color: var(--green-color);
    `};
`;

export const RowContainer = styled.div`
  width: 100%;
  padding: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const RowTitle = styled.p`
  font-size: 20px;
  color: var(--letter-color-6);
`;

export const DateText = styled.p`
  font-size: 18px;
  color: var(--letter-color-4);
  letter-spacing: 1.5px;
`;

export const IconContainer = styled.div<IBackgroundColor>`
  padding: 8px;
  background-color: ${({ color }) => color};
  border-radius: 8px;
  border: 2px solid black;
`;

export const NextTransactionContainer = styled.div`
  padding: 8px;
`;

export const FooterContainer = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 8px 16px 0;
`;

export const TransactionRow = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;

export const MenuButtonSection = styled.div`
  display: flex;
  overflow-x: scroll;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 7px 4px 4px;
`;

export const MenuButton = styled.button`
  background-color: var(--letter-color-1);
  margin-bottom: 8px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  width: 112px;
  height: 112px;
  border: none;
  margin-right: 16px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
`;

export const SectionTitle = styled.p`
  margin-bottom: 4px;
  font-size: 18px;
  font-weight: bold;
  color: var(--letter-color-6);
`;

export const TransactionText = styled.p`
  margin-bottom: 4px;
  font-size: 20px;
  color: var(--letter-color-6);
`;

export const MenuText = styled.p`
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: bold;
  color: var(--letter-color-6);
`;

export const SectionBorder = styled.div`
  width: 100%;
  min-height: 1px;
  background-color: var(--letter-color-4);
  /* margin: 8px 0; */
`;

export const SectionTitleLine = styled.div`
  width: 80%;
  min-height: 1.2px;
  background-color: var(--primary-color);
  /* margin: 8px 0; */
`;
