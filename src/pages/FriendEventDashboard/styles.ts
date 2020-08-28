import styled from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;

  > img {
    width: 100%;
  }
`;

export const Content = styled.main`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px 80px;
  gap: 32px;

  > button {
    height: 40px;
    background-color: var(--primary-color);
    box-shadow: 2px 2px 5px 4px rgba(0, 0, 0, 0.2);
    border: none;
    border-radius: 4px;
    color: var(--letter-color-1);
    font-weight: 500;
    font-size: 20px;
    transition: 0.5s;

    &:hover {
      box-shadow: 1px 1px 220px 1px var(--title-color);
      color: var(--letter-color-5);
    }
    &:active {
      box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.2);
      color: var(--letter-color-4);
    }
  }

  > h1 {
    font-size: 40px;
    color: var(--primary-color);
    margin: 0 auto;
    border-bottom: 1px solid var(--title-color);
    width: 60%;
    text-align: center;
    padding-bottom: 8px;
    margin-bottom: 32px;
  }
`;

export const FriendsEvents = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  position: relative;

  > span {
    padding: 16px;
    border-radius: 8px;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    > h1 {
      padding-bottom: 8px;
      width: 100%;
      font-size: 24px;
      color: var(--letter-color-4);
      font-weight: 500;
    }

    > p {
      padding-bottom: 8px;
      width: 100%;
      font-size: 22px;
      color: var(--letter-color-5);
      font-weight: 500;
    }

    > div {
      display: flex;
      flex-direction: column;
      gap: 16px;

      > button {
        background: transparent;
        border: none;
        color: var(--primary-color);
      }
    }

    > span {
      display: grid;
      grid-template-columns: 4fr 1fr 4fr;
      gap: 8px;

      > p {
        padding-bottom: 8px;
        width: 100%;
        font-size: 16px;
        color: var(--letter-color-5);
        font-weight: 500;
      }
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;

    > span {
      margin-top: 32px;
      display: flex;
      gap: 8px;

      > p {
        padding-bottom: 8px;
        width: 100%;
        font-size: 16px;
        color: var(--letter-color-5);
        font-weight: 500;
      }
    }
  }
`;
