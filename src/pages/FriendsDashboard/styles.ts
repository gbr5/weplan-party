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
  position: relative;
  width: 100%;
  display: grid;
  padding-right: 80px;
  grid-template-columns: 2fr 9fr;
  gap: 80px;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  margin-bottom: 32px;
  gap: 32px;
`;

export const MessagesSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1px;
`;

export const UsersChat = styled.div`
  display: grid;
  grid-template-rows: repeat(7, 1fr);
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
      width: 100%;
      font-size: 24px;
      color: var(--primary-color);
      border-bottom: 1px solid var(--letter-color-2);
    }
  }
`;

export const UserChat = styled.div`
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--letter-color-4);

  > h1 {
    font-size: 18px;
    color: var(--title-color);
  }

  > svg {
    margin-left: auto;
  }
`;

export const ChatMessages = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  align-items: flex-start;
  gap: 16px;
  position: relative;

  > div {
    width: 100%;

    padding: 16px;
    border-radius: 8px;
    background-color: var(--header-background-color);
    box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    > h1 {
      width: 100%;
      font-size: 24px;
      color: var(--primary-color);
      border-bottom: 1px solid var(--letter-color-2);
    }

    button {
      width: 100%;
      height: 40px;
      background-color: var(--primary-color);
      opacity: 0.9;
      border: none;
      border-radius: 4px;
    }

    input {
      border: none;
      height: 40px;
      width: 100%;
      border-radius: 4px;
      background-color: var(--letter-color-4);
      color: var(--letter-color-2);
    }
  }
`;

export const Messages = styled.div`
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--letter-color-4);

  > p {
    font-size: 16px;
    color: var(--letter-color-1);
    margin-right: 16px;
  }
  > p + p {
    margin-left: auto;
  }
  > span {
    margin-right: 16px;
    color: var(--letter-color-3);
  }
`;
