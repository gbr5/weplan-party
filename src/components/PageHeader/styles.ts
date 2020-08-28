import styled from 'styled-components';
import '../../styles/global';

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

  > button {
    background: transparent;
    border: none;
  }
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
