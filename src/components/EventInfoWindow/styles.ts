import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  > h1 {
    font-size: 24px;
    color: var(--primary-color);
    height: 40px;
    width: 100%;
  }

  > h2 {
    font-size: 26px;
    color: var(--title-color);
  }

  button {
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 100%;
    border-radius: 4px;
  }
`;

export const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 60%;
  position: relative;
  margin: 0 auto;
  gap: 32px;

  > span {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    width: 100%;

    > div {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      gap: 16px;
      width: 100%;

      > div {
        text-align: start;
        height: 40px;

        > p {
          margin-right: auto;
          width: 250px;
          font-size: 20px;
          color: var(--letter-color-3);
        }

        > h3 {
          width: 100%;
          font-size: 22px;
          color: var(--primary-color);
        }
      }
    }
  }

  > div {
    height: 40px;
    width: 100%;
    text-align: start;

    > p {
      margin-right: auto;
      width: 250px;
      font-size: 20px;
      color: var(--letter-color-3);
    }

    > h3 {
      width: 100%;
      font-size: 22px;
      color: var(--primary-color);
    }
  }
`;
