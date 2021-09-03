import styled, { css } from 'styled-components';

interface IProps {
  isActive: boolean;
}

export const OverContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const Container = styled.div<IProps>`
  position: relative;
  width: 100%;
  height: 56px;
  margin: 0 auto;
  padding: 8px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
  ${({ isActive }) =>
    isActive &&
    css`
      border: 0.5px solid var(--primary-color);
    `}
  border-radius: 4px;
  transition: 0.25s;
  @media (max-width: 1000px) {
    margin-bottom: 2vh;
  }

  &:last-child {
    margin-bottom: 16px;
  }

  &:hover {
    box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
    background: var(--card-color);

    p {
      color: var(--title-color);
    }
  }
`;

export const GuestInfoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  border: none;
  background-color: transparent;
`;
export const Index = styled.p`
  color: var(--primary-color);
  font-size: 16px;
  margin: 0 8px;
`;
export const Name = styled.p`
  font-size: 16px;
  color: var(--letter-color-6);
  flex: 1;
  text-align: left;
`;
export const ConfirmGuestButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 24px;
  margin-left: 8px;
`;
