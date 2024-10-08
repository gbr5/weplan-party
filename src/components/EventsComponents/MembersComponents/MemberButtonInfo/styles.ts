import styled from 'styled-components';

interface IBackgroundColor {
  color: string;
}

export const Container = styled.div`
  top: -14px;
  z-index: 1;
  position: relative;
  width: 99%;
  background-color: var(--letter-color-1);
  margin: 0 auto 8px;
  border-radius: 8px;
  padding: 8px;
  padding-top: 18px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
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
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  position: relative;
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 8px 16px 0;
`;

export const MenuButtonSection = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  margin: 7px 4px 0;
  padding-left: 16px;
`;

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
