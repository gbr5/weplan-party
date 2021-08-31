import styled from 'styled-components';

interface IBackgroundColor {
  color: string;
}

export const Container = styled.div`
  top: -24px;
  border-radius: 8px;
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  margin-top: 8px;
  background-color: var(--letter-color-1);
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.2);
  padding: 8px;
  padding-top: 16px;
`;

export const Menu = styled.div`
  display: flex;
  overflow-x: scroll;
  width: 100%;
  margin: 4px 0;
  padding: 8px;
`;

export const MenuButtonContainer = styled.div``;

export const MenuButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  border-radius: 24px;
  align-items: center;
  justify-content: space-between;
  width: 108px;
  height: 108px;
  margin-right: 16px;
  border: none;
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.3);
`;

export const MenuText = styled.p`
  font-size: 14px;
  color: var(--letter-color-1);
  margin-top: 4px;
`;

export const MenuTitle = styled.p`
  margin: 8px 0;
  font-size: 16px;
  color: var(--letter-color-6);
`;

export const IconContainer = styled.div<IBackgroundColor>`
  position: relative;
  padding: 8px;
  background-color: ${({ color }) => color};
  border-radius: 24px;
  /* flex-direction: row; */
  align-items: center;
  justify-content: center;
  width: 108px;
  height: 72px;
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.2);
`;

export const DateText = styled.p`
  color: var(--letter-color-6);
  font-size: 20px;
  letter-spacing: 1px;
`;

export const DateButton = styled.button`
  align-items: center;
  justify-content: center;
  background-color: var(--letter-color-1);
  padding: 4px;
  border: 0.5px solid var(--letter-color-3);
  border-radius: 5px;
  width: 40%;
  margin-top: 24px;
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.2);
`;

export const TaskTitleContainer = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 104px;
`;

export const TaskHeader = styled.p`
  position: absolute;
  top: 2px;
  left: 4px;
  color: var(--letter-color-2);
  font-size: 16px;
  letter-spacing: 1px;
`;

export const TaskTitle = styled.p`
  color: var(--letter-color-6);
  font-size: 20px;
  letter-spacing: 1px;
`;

export const DateContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
  width: 100%;
  height: 80px;
`;

export const DateHeader = styled.p`
  position: absolute;
  top: 2px;
  left: 4px;

  color: var(--letter-color-6);
  font-size: 16px;
  letter-spacing: 1px;
`;
