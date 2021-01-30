import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  margin-top: 8.5vh;

  gap: 4vh;
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

export const CategoriesMenu = styled.div`
  width: 100%;
  display: flex;
  div {
    display: inline-flexbox;
    width: 100%;
    align-items: stretch;
    justify-content: center;
    overflow-x: scroll;
  }
`;

interface ICategoryProps {
  isActive: boolean;
  background: string;
}

export const Category = styled.button<ICategoryProps>`
  background: ${props => props.background};
  border: 2px solid ${props => props.background};
  border-radius: 4px;
  height: 40px;
  width: 160px;
  box-shadow: var(--box-shadow);
  color: var(--letter-color-5);

  ${props =>
    props.isActive &&
    css`
      font-weight: 500;
      font-size: 20px;
      border: 2px solid var(--title-color);
    `}
`;

export const AddButton = styled.button`
  border-radius: 4px;
  border: none;
  background: var(--primary-color);
  color: var(--secondary-color);
  box-shadow: var(--box-shadow);

  width: 100%;
  height: 32px;
  font-weight: 500;

  &:hover {
    color: var(--primary-color);
    background: var(--secondary-color);
    box-shadow: var(--window-box-shadow);
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
