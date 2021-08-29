import styled, { css } from 'styled-components';

interface IMenuButtonProps {
  isActive: boolean;
}

export const Container = styled.div`
  flex: 1;
`;

export const TitleButton = styled.button`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.p`
  font-weight: bold;
  font-size: 24px;
  color: var(--letter-color-6);
  text-align: center;
  margin-top: 8px;
`;

export const FirstSection = styled.div`
  width: 100%;
  margin-top: 8px;
  height: 60.7%;
`;

export const BudgetSection = styled.button`
  width: 100%;
  border-radius: 8px;
  padding: 8px;
  background-color: var(--primary-color);
  align-items: center;
  justify-content: center;
`;

export const BudgetTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: var(--letter-color-6);
  margin-bottom: 6px;
`;

export const BudgetValue = styled.p`
  font-size: 22px;
  color: var(--letter-color-6);
`;

export const Resume = styled.div`
  width: 100%;
  align-items: center;
  justify-content: space-around;
  border: 1px solid black;
  border-radius: 8px;
  margin-top: 16px;
  padding: 8px;
`;

export const PercentageUnderline = styled.div`
  background-color: var(--letter-color-4);
  height: 1px;
  width: 100%;
  margin-bottom: 8px;
`;

export const ResumeTitle = styled.p`
  width: 100%;
  text-align: left;
  font-weight: bold;
  font-size: 18px;
  color: var(--letter-color-6);
  margin-bottom: 8px;
`;

export const ResumeUnderline = styled.div`
  background-color: var(--letter-color-3);
  height: 1px;
  width: 100%;
  margin-bottom: 8px;
`;

export const ResumeValue = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: var(--letter-color-6);
`;

export const SectionButton = styled.div`
  width: 100%;
  padding: 8px;
  padding-right: 18px;
  margin-top: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const MenuButton = styled.button<IMenuButtonProps>`
  flex-direction: row;
  /* width: 180px; */
  width: 32%;
  height: 40px;
  border-radius: 5px;
  ${({ isActive }) =>
    isActive
      ? css`
          background-color: var(--primary-color);
        `
      : css`
          background-color: var(--secondary-color);
        `};
  /* margin: 0 8px; */
  align-items: center;
  justify-content: center;
  /* padding: 8px; */
`;

export const ButtonTitle = styled.p<IMenuButtonProps>`
  font-weight: bold;
  font-size: 18px;
  color: ${({ isActive }) =>
    isActive
      ? css`
          color: var(--secondary-color);
        `
      : css`
          color: var(--letter-color-1);
        `};
  text-align: center;
  line-height: 26px;
`;
