import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  background: var(--header-background-color);
  border-radius: 8px;

  > h1 {
    color: var(--primary-color);
    font-size: 24px;
  }

  > span {
    display: flex;
    gap: 32px;
    align-items: center;
    justify-content: center;
    margin: 0;
    width: 100%;

    > button {
      background: transparent;
      border: none;
      width: 250px;

      > h3 {
        font-size: 20px;
        color: var(--title-color);
      }
    }
  }

  > div {
    display: flex;
    gap: 16px;
  }
`;

export const Transaction = styled.div``;

export const Suppliers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  > h2 {
    font-size: 24px;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 250px;
    height: 300px;
    overflow-y: scroll;
    padding: 16px;

    > button {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 16px;
      padding: 4px 8px;

      > p {
        font-size: 16px;
        font-weight: 500;
        color: var(--primary-color);
      }

      > h3 {
        font-size: 16px;
        color: var(--letter-color-5);
      }
    }
  }
`;
