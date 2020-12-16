import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.25s;
  width: 100%;

  > h1 {
    font-size: 32px;
    color: var(--title-color);
  }

  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    width: 100%;

    > button {
      height: 40px;
      width: 100%;
      border-radius: 4px;
      padding: 0 16px;
      border: none;
      transition: 0.25s;

      &:hover {
        opacity: 0.8;
        box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
      }
    }

    > h1 {
      > button {
        background: transparent;
        border: none;
        color: var(--primary-color);
        font-size: 24px;
        font-weight: 500;
        transition: 0.25s;

        &:hover {
          opacity: 0.8;
          box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
        }
      }
    }
  }

  button {
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 100%;
    border-radius: 4px;
    margin-bottom: 16px;
    transition: 0.25s;

    &:hover {
      opacity: 0.8;
      box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
    }
  }
`;

export const AddMultipleGuests = styled.span`
  width: 100%;

  > button {
    width: 100%;
    display: flex;
    gap: 24px;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--primary-color);
    transition: 0.25s;

    &:hover {
      color: var(--title-color);
      background: var(--button-background-hover);
    }
  }
`;
