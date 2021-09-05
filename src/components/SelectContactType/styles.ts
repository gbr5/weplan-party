import styled, { css } from 'styled-components';

export const Container = styled.div`
  flex: 1;
  align-items: center;
  width: 100%;
  margin-top: 40px;
  background-color: var(--letter-color-1);
  padding: 16px;
  border-radius: 8px;
`;

export const Title = styled.p`
  font-weight: bold;
  font-size: 24px;
  margin: 16px 0;
`;

interface IProps {
  isActive: boolean;
}

export const ContactTypeButton = styled.button<IProps>`
  display: flex;
  width: 100%;
  height: 64px;
  border-radius: 8px;
  background-color: var(--letter-color-1);
  margin: 16px 0;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 32px;
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: var(--primary-color);
    `}
`;

export const ContactTypeText = styled.p<IProps>`
  color: var(--primary-color);
  font-size: 20px;

  ${props =>
    props.isActive &&
    css`
      color: var(--letter-color-6);
      font-weight: bold;
    `}
`;

export const IconContainer = styled.div`
  display: flex;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border: 1px solid var(--letter-color-6);
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
`;
