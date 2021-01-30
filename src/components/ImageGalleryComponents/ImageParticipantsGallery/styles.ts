import styled, { css } from 'styled-components';

interface IGridViewProps {
  gridView: boolean;
}

export const Container = styled.div<IGridViewProps>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 8.5vh;
  align-items: center;
  justify-content: center;
  gap: 4px;

  ${props =>
    !props.gridView &&
    css`
      grid-template-columns: 1fr;
    `}

  button {
    width: 100%;
  }
`;

interface IImageViewProps {
  gridView: boolean;
}

export const ImageButton = styled.img<IImageViewProps>`
  max-width: 30vw;
  ${props =>
    !props.gridView &&
    css`
      max-width: 100vw;
    `}
`;
