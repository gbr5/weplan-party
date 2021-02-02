import styled, { css } from 'styled-components';

interface IAppointmentProps {
  isActive: boolean;
}

export const Container = styled.div<IAppointmentProps>`
  display: flex;
  align-items: center;
  justify-content: stretch;

  padding: 8px;

  color: var(--secondary-color);
  background: var(--primary-color);
  box-shadow: var(--box-shadow);
  border-radius: 4px;

  transition: 0.3s;

  &:hover {
    background: var(--secondary-color);
    color: var(--primary-color);
    box-shadow: var(--window-box-shadow);
  }

  ${props =>
    props.isActive &&
    css`
      background: var(--secondary-color);
      color: var(--primary-color);
      box-shadow: var(--window-box-shadow);
    `}
`;

export const AppointmentInfoButton = styled.button`
  display: flex;
  gap: 8px;

  background: transparent;
  border: none;
  margin-left: auto;
  /* width: 16px; */

  color: var(--red-color);
`;

export const TitleButton = styled.button`
  display: flex;
  gap: 8px;
  background: transparent;
  border: none;
  margin: 0 16px;
  width: 100%;
`;
