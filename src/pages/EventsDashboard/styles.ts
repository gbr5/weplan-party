import styled from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  z-index: 5;

  width: 100%;
  padding: 16px 0;

  background: var(--header-background-color);
  box-shadow: var(--box-shadow);
`;

export const HeaderContent = styled.div`
  max-width: 95%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export const Logo = styled.h2`
  color: var(--primary-color);
  font-size: 32px;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;

  > img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.1);
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: var(--letter-color-3);
    }

    a {
      text-decoration: none;
      color: var(--primary-color);
      transition: 0.2s;
    }

    a:hover {
      opacity: 0.7;
    }
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;

  button {
    background: transparent;
    border: 0;
    margin-left: 32px;
    font-size: 18px;
    font-weight: 500;
    color: var(--letter-color-1);

    svg {
      color: var(--letter-color-1);
      width: 30px;
      height: 30px;
    }
  }
`;

export const Content = styled.main`
  margin-top: 110px;
  position: relative;
  width: 100%;
  display: grid;
  padding: 0 80px;
  grid-template-rows: 1fr 6fr;
  gap: 2px;

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    height: 42px;

    > button {
      background-color: transparent;
      border: none;
    }

    > button + button {
      padding-left: 16px;
      border-left: 1px solid var(--primary-color);

      &::before {
        position: absolute;
        height: 80%;
        width: 1px;
        left: 0;
        top: 8px;
        content: '';
        background: var(--primary-color);
      }
    }

    > div {
      position: absolute;
      top: 4px;
      left: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;

      > h3 {
        font-size: 20px;
        line-height: 30px;
        padding: 0 16px;
      }

      > p {
        font-size: 20px;
        line-height: 30px;
      }
    }

    > span {
      position: absolute;
      top: 4px;
      right: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;

      > input {
        border: none;
        height: 30px;
        padding: 0 16px;
        border-radius: 4px;
      }

      > button {
        background: transparent;
        border: none;
      }
    }
  }
`;

export const MyEvents = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  position: relative;

  > div {
    padding: 16px;
    border-radius: 8px;
    background-color: var(--header-background-color);
    box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    > h1 {
      padding-bottom: 8px;

      width: 100%;
      font-size: 24px;
      color: var(--primary-color);
      border-bottom: 1px solid var(--letter-color-2);
    }
  }
`;

export const FriendsEvents = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  position: relative;

  > div {
    padding: 16px;
    border-radius: 8px;
    background-color: var(--header-background-color);
    box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    > h1 {
      padding-bottom: 8px;

      width: 100%;
      font-size: 24px;
      color: var(--primary-color);
      border-bottom: 1px solid var(--letter-color-2);
    }
  }
`;

export const Event = styled.button`
  margin: 16px;
  display: flex;
  flex-direction: column;
  height: 330px;
  width: 300px;
  border-radius: 8px;
  background: var(--card-color);
  border: none;
  position: relative;

  > img {
    height: 180px;
    width: 100%;
    border-radius: 8px 8px 0 0;
  }

  > div {
    position: absolute;
    display: flex;
    gap: 8px;
    top: 16px;
    right: 16px;
    color: var(--primary-color);
  }

  > h1 {
    margin: 8px auto;
    color: var(--primary-color);
    font-size: 24px;
  }

  > h3 {
    margin: 0 auto 8px;
    color: var(--letter-color-2);
    font-size: 22px;
  }

  > span {
    width: 90%;
    text-align: left;
    margin: 4px 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > span {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      color: var(--letter-color-3);
      font-size: 16px;
      font-weight: 500;
    }
  }
`;
