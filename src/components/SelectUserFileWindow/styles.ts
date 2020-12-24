import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  align-items: stretch;
  justify-content: stretch;
  transition: 0.25s;
  width: 100%;
  gap: 16px;

  > button {
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
    transition: 0.5s;
    box-shadow: var(--box-shadow);

    font-weight: 500;
    font-size: 20px;

    &:hover {
      color: var(--primary-color);
      background: var(--secondary-color);
      box-shadow: var(--window-box-shadow);
    }
  }
`;

export const SideMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

interface IButtonProps {
  isActive: boolean;
}

export const FileButton = styled.button<IButtonProps>`
  background: var(--secondary-color);
  border: none;
  margin: auto;
  gap: 5px;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  color: var(--letter-color-5);
  transition: 0.5s;
  box-shadow: var(--window-box-shadow);

  &:hover {
    color: var(--letter-color-5);
    background: var(--primary-color);
    box-shadow: var(--box-shadow);
  }

  img {
    height: 64px;
    width: 64px;
    border-radius: 50%;
    box-shadow: var(--box-shadow);
  }

  ${props =>
    props.isActive &&
    css`
      background: var(--title-color);
      border: none;
      margin: auto;
      gap: 5px;
      width: 100%;
      border-radius: 8px;
      color: var(--letter-color-5);
      transition: 0.5s;
      box-shadow: var(--box-shadow);

      &:hover {
        box-shadow: var(--window-box-shadow);
        background: rgba(0, 0, 0, 0.4);
        color: var(--letter-color-5);
      }
    `}
`;

interface IBooleanProps {
  isActive: boolean;
}

export const CategoryButton = styled.button<IBooleanProps>`
  background: var(--secondary-color);
  border: none;
  margin: auto;
  gap: 5px;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  color: var(--letter-color-5);
  transition: 0.5s;
  box-shadow: var(--window-box-shadow);

  &:hover {
    color: var(--letter-color-5);
    background: var(--primary-color);
    box-shadow: var(--box-shadow);
  }

  img {
    height: 64px;
    width: 64px;
    border-radius: 50%;
    box-shadow: var(--box-shadow);
  }

  ${props =>
    props.isActive &&
    css`
      background: var(--title-color);
      border: none;
      margin: auto;
      gap: 5px;
      width: 100%;
      border-radius: 8px;
      color: var(--letter-color-5);
      transition: 0.5s;
      box-shadow: var(--box-shadow);

      &:hover {
        box-shadow: var(--window-box-shadow);
        background: rgba(0, 0, 0, 0.4);
        color: var(--letter-color-5);
      }
    `}
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  transition: 0.25s;
  width: 100%;
  gap: 16px;

  h2 {
    width: 100%;
    text-align: center;
    border-bottom: 0.5px solid var(--primary-color);
    font-size: 24px;
    margin: 16px auto;
    color: var(--title-color);
  }

  > button {
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
    transition: 0.5s;
    box-shadow: var(--box-shadow);

    font-weight: 500;
    font-size: 20px;

    &:hover {
      color: var(--primary-color);
      background: var(--secondary-color);
      box-shadow: var(--window-box-shadow);
    }
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    transition: 0.25s;
    width: 100%;
    gap: 16px;
    height: 500px;
    overflow-y: scroll;

    h2 {
      width: 100%;
      text-align: center;
      border-bottom: 0.5px solid var(--primary-color);
      font-size: 24px;
      margin: 16px auto;
      color: var(--title-color);
    }

    > button {
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
      transition: 0.5s;
      box-shadow: var(--box-shadow);

      font-weight: 500;
      font-size: 20px;

      &:hover {
        color: var(--primary-color);
        background: var(--secondary-color);
        box-shadow: var(--window-box-shadow);
      }
    }
  }
`;
