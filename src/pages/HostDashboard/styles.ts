import styled from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  position: relative;
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
    font-weight: 600;
    color: var(--letter-color-2);

    svg {
      color: var(--letter-color-2);
      width: 30px;
      height: 30px;
    }
  }
`;

export const Content = styled.main`
  position: relative;
  max-width: 90%;
  margin: 23px auto 16px;
  display: flex;
  flex-direction: column;
`;

export const SubHeader = styled.div`
  margin: 88px 0 32px;
  display: grid;
  grid-template-columns: 4fr 3fr 12fr;
  align-items: center;

  > h1 {
    font-size: 24px;
    color: var(--title-color-4);
  }
`;

export const MyEventsDrawer = styled.div`
  top: 168px;
  z-index: 10;
  position: absolute;
  height: 300px;
  width: 500px;
  background-color: var(--card-color);
  border-radius: 0 0 8px 8px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px;

  > button {
    background-color: rgba(255, 144, 0, 0.05);
    display: flex;
    justify-content: center;
    color: var(--letter-color-3);
    margin: 8px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 16px;

    &:hover {
      background-color: rgba(255, 144, 0, 0.15);
    }
    svg {
      margin-left: auto;
    }
  }
`;

export const MyEventsDrawerButton = styled.button`
  background: transparent;
  border: none;

  > h1 {
    font-size: 24px;
    color: var(--primary-color);

    &:hover {
      opacity: 0.6;
    }
    &::active {
      color: var(--title-color);
    }
  }
`;

export const MyEvents = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: var(--primary-color);
`;

export const NextEvent = styled.div`
  p {
    color: var(--primary-color);
    display: flex;
    align-items: center;
    font-weight: bold;

    span {
      display: flex;
      align-items: center;
    }
  }
`;

export const FirstRow = styled.div`
  background: var(--header-background-color);
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-radius: 10px;
  position: relative;

  svg {
    margin-right: 16px;
  }

  &::before {
    position: absolute;
    height: 80%;
    width: 1px;
    left: 0;
    top: 8px;
    content: '';
    background: var(--primary-color);
  }

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  div {
    margin: 16px;
    color: var(--letter-color-3);
    display: flex;
    align-items: center;
    justify-content: center;

    strong {
      margin-left: 32px;
    }
  }

  span {
    margin-left: auto;
    margin-right: 16px;
    display: flex;
    align-items: center;
    color: var(--letter-color-2);

    svg {
      color: var(--primary-color);
      margin-right: 8px;
    }
  }
`;

export const MiddlePage = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FriendsEvents = styled.div`
  background: var(--header-background-color);
  padding: 24px;
  border-radius: 8px;
  height: 220px;
  overflow: hidden;

  margin-bottom: 32px;

  > strong {
    color: var(--letter-color-2);
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid var(--letter-color-4);
    display: block;
    margin-bottom: 12px;
    padding-bottom: 16px;
  }

  li {
    list-style: none;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid var(--letter-color-4);
    padding: 0 0 8px 8px;
    h3 {
      color: var(--title-color);
      font-size: 16px;
    }
    svg {
      margin-left: auto;
      padding-bottom: 8px;
    }
  }
  li + li {
    margin-top: 16px;
  }
`;

export const MyNextEvent = styled.section`
  background: var(--header-background-color);
  padding: 24px;
  border-radius: 8px;
  height: 220px;
  box-shadow: 1px 1px 10px 5px rgba(100, 90, 10, 0.2);

  margin-bottom: 32px;
  position: relative;

  > button {
    background: transparent;
    border: none;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  span {
    position: absolute;
    top: 24px;
    right: 24px;
    color: var(--letter-color-2);
    font-size: 18px;
  }
`;

export const MyNextEventTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  width: 80%;
  border-bottom: 1px solid var(--primary-color);

  > strong {
    color: var(--letter-color-2);
    font-size: 20px;
    line-height: 26px;
    display: block;
  }

  h2 {
    margin-left: 24px;
    color: var(--title-color);
  }
`;

export const Section = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const Fields = styled.div`
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 90%;
  border-radius: 10px;
  position: relative;

  p {
    position: absolute;
    top: 8px;
    left: 8px;
  }

  h2 {
    font-size: 32px;
    color: var(--primary-color);
    margin-top: 16px;
  }
`;

export const BottomPage = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 32px;
`;

export const LatestNews = styled.div`
  background: var(--header-background-color);
  padding: 24px;
  border-radius: 8px;
  height: 300px;
  box-shadow: 1px 1px 5px 4px rgba(50, 50, 50, 0.2);
  flex: 1;
  align-items: center;

  > strong {
    color: var(--letter-color-2);
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid var(--letter-color-4);
    display: block;
    margin-bottom: 12px;
    padding-bottom: 16px;
  }

  li {
    list-style: none;
    padding: 0 8px 12px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--letter-color-4);

    h3 {
      color: var(--title-color);
    }

    span {
      margin-left: 4px;
      color: var(--primary-color);
    }
    p {
      margin-right: auto;
      margin-left: 16px;
    }
  }

  li + li {
    margin-top: 16px;
  }
`;

export const Payments = styled.section`
  background: var(--header-background-color);
  padding: 24px;
  border-radius: 8px;
  height: 300px;
  margin-bottom: 24px;
  box-shadow: 1px 1px 5px 4px rgba(90, 90, 90, 0.02);

  > strong {
    color: var(--letter-color-2);
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid var(--letter-color-4);
    display: block;
    margin-bottom: 16px;
    padding-bottom: 16px;
  }

  li {
    list-style: none;
    padding: 0 8px 16px;
    display: grid;
    grid-template-columns: 4fr 16fr 1fr;
    align-items: center;
    border-bottom: 1px solid var(--letter-color-4);

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    span {
      margin-right: auto;
    }
  }

  li + li {
    margin-top: 16px;
  }
`;
