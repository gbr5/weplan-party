import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  margin-top: 8.5vh;
`;
export const ImageContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: center;
  gap: 4px;

  button {
    width: 100%;

    img {
      max-width: 30vw;
    }
  }
`;

export const CategoriesMenu = styled.div`
  width: 100%;
  div {
    display: inline-flexbox;
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
