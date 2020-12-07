import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 5fr;
  gap: 16px;
  width: 100%;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    > h1 {
      position: absolute;
      top: 24px;
      left: 24px;
      font-size: 24px;
      color: var(--title-color);
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin: 0 auto;

      h1 {
        font-size: 32px;
        color: var(--primary-color);
      }

      strong {
        font-size: 32px;
        color: var(--title-color);
      }
    }
  }
`;

export const SuppliersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 32px;
  width: 100%;
  gap: 32px;
  overflow-y: scroll;

  button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 8px;
    background: var(--letter-color-3);
    height: 100px;
    padding: 32px auto;
    gap: 16px;
    box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.2);
    transition: 0.25s;

    > img {
      margin-left: 14px;
      height: 80px;
      width: 80px;
      border-radius: 50%;
      box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.2);
      transition: 0.25s;

      &:hover {
        box-shadow: 5px 5px 6px 2px rgba(255, 150, 10, 0.4);
      }
    }

    > h1 {
      font-size: 24px;
      color: var(--letter-color-5);
    }

    &:hover {
      box-shadow: 4px 4px 6px 2px rgba(255, 150, 10, 0.3);
      opacity: 0.8;
    }
  }
`;
