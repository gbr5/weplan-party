import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  transition: 0.25s;
  width: 100%;
  gap: 16px;
`;
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  h2 {
    margin: 24px auto 0;
    font-size: 24px;
    font-weight: 500;
    color: var(--primary-color);
  }

  > img {
    height: 200px;
    width: 200px;
    border-bottom: 0.2px solid var(--title-color);
  }
`;
interface IButtonProps {
  isActive: boolean;
}
export const BooleanButton = styled.button<IButtonProps>`
  margin-top: 8px;
  width: 100%;
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--secondary-color);
  transition: 0.5s;
  background: var(--primary-color);
  height: 40px;
  border-radius: 4px;
  margin-bottom: 8px;
  transition: 0.3s;
  box-shadow: var(--box-shadow);

  font-weight: 500;
  font-size: 20px;

  &:hover {
    color: var(--primary-color);
    background: var(--secondary-color);
    box-shadow: var(--window-box-shadow);
  }

  ${props =>
    props.isActive &&
    css`
      opacity: 0.8;
      background: var(--background-color);
      color: var(--primary-color);
      transition: 0.3s;
      border-bottom: 1px solid var(--title-color);
      box-shadow: var(--window-box-shadow);

      &:hover {
        box-shadow: var(--box-shadow);
        background: var(--primary-color);
        color: var(--background-color);
        opacity: 1;
      }
    `}
`;
