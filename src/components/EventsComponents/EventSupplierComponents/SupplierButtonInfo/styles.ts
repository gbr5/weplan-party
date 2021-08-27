import styled from 'styled-components';

interface ISupplierProps {
  isHired: boolean;
}

interface IsLate {
  isLate: boolean;
}

interface IBackgroundColor {
  color: string;
}

// 1
export const Container = styled.div`
  top: -8px;
  width: 99%;
  /* background-color: var(--red-color); */
  background-color: var(--letter-color-1);
  margin: 0 auto 8px;
  border-radius: 8px;
  padding: 8px;
  border: 0.5px solid var(--title-color);
  box-sizing: border-box;
`;

// 2
export const SupplierName = styled.p`
  font-weight: bold;
  font-size: 18px;
  color: var(--letter-color-6);
  text-align: center;
`;

// 3
export const SupplierLabel = styled.p`
  font-size: 16px;
  color: var(--letter-color-6);
  position: absolute;
  top: 16px;
  left: 16px;
`;

// 4
export const FieldContainer = styled.div`
  height: 80px;
  width: 100%;
  justify-content: flex-end;
  display: flex;
  position: relative;
`;

// 5
export const SupplierNameButton = styled.button`
  border-radius: 8px;
  padding: 8px;
  align-items: center;
  justify-content: center;
  background-color: var(--letter-color-2);
  border: 1px solid var(--letter-color-3);
  margin: 8px;
  width: 100%;
`;

// 6
export const SupplierConfirmationButton = styled.button<ISupplierProps>`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  width: 100%;
  padding: 8px;
  align-items: center;
  justify-content: space-evenly;
  background-color: var(--letter-color-2);
  border: 1px solid var(--letter-color-3);
`;

// 7
export const RowContainer = styled.div`
  width: 100%;
  padding: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

// 8
export const RowTitle = styled.p`
  font-size: 20px;
  color: var(--letter-color-6);
`;

// 9
export const DateText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: var(--secondary-color);
  letter-spacing: 1.5px;
`;

// 10
export const IconContainer = styled.div<IBackgroundColor>`
  padding: 8px;
  background-color: ${({ color }) => color};
  border-radius: 8px;
  border: 2px solid black;
`;

// 11
export const NextTransactionContainer = styled.div`
  padding: 8px;
`;

// 12
export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 8px 16px 0;
`;

// 13
export const TransactionRow = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

// 14
export const MenuButtonSection = styled.div`
  /* margin: 7px 4px 0; */
  /* position: relative; */
  display: flex;
  width: 100%;
  align-items: stretch;
  justify-content: center;
  overflow-x: scroll;

  @media (max-width: 600px) {
    padding-left: 220px;
  }
`;

// 15
export const MenuButton = styled.button`
  background-color: var(--letter-color-1);
  margin-bottom: 8px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  min-width: 112px;
  min-height: 112px;
  border: none;
  margin-right: 16px;
`;

// 16
export const SectionTitle = styled.p`
  margin-bottom: 4px;
  font-size: 18px;
  font-weight: bold;
  color: var(--letter-color-6);
`;

// 17
export const TransactionText = styled.p<IsLate>`
  margin-bottom: 4px;
  font-size: 18px;
  color: ${({ isLate }) =>
    isLate ? 'var(--red-color)' : 'var(--letter-color-6)'};
  text-align: center;
`;

// 18
export const MenuText = styled.p`
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: bold;
  color: var(--letter-color-6);
`;

// 19
export const SectionBorder = styled.div`
  width: 100%;
  min-height: 1px;
  background-color: var(--secondary-color);
  /* margin: 8px 0; */
`;

// 20
export const SectionTitleLine = styled.div`
  width: 80%;
  min-height: 1.2px;
  background-color: var(--primary-color);
  /* margin: 8px 0; */
`;
