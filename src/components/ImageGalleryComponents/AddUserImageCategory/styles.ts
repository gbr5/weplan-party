import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
`;

export const SelectColorContainer = styled.div`
  display: flex;
  width: 100%;
  overflow-x: scroll;
  gap: 4vw;
`;

interface IColorProps {
  isActive: boolean;
  color: string;
}

export const ColorButton = styled.button<IColorProps>`
  background: ${props => props.color};
  height: 32px;
  width: 250px;
  opacity: 0.8;
  border-radius: 4px;
  box-shadow: var(--box-shadow);
  border: 2px solid ${props => props.color};

  &:hover {
    opacity: 1;
  }

  ${props =>
    props.isActive &&
    css`
      opacity: 1;
      box-shadow: var(--window-box-shadow);
      border: 2px solid black;
    `}
`;
