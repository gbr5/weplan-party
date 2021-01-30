import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8.5vh;
`;

interface IGridViewProps {
  gridView: boolean;
}

export const ImageContainer = styled.div<IGridViewProps>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

export const CategoriesMenu = styled.div`
  display: inline-block;
  overflow-x: scroll;
`;

interface ICategoryProps {
  isActive: boolean;
}

export const Category = styled.button<ICategoryProps>`
  background: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 4px;
  height: 40px;
  width: 160px;
  box-shadow: var(--box-shadow);

  ${props =>
    props.isActive &&
    css`
      background: var(--secondary-color);
      border: 2px solid var(--title-color);
    `}
`;
