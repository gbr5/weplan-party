import styled from 'styled-components';
import { shade } from 'polished';
import '../../styles/global';

export const Container = styled.div`
  height: 100vh;

  display: flex;
`;

export const Header = styled.header`
  position: fixed;
  top: 0;

  width: 100%;
  padding: 32px 0;

  background: var(--header-background-color);
  box-shadow: var(--box-shadow);
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  svg {
    color: var(--letter-color-2);
    width: 30px;
    height: 30px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
  }
`;

export const ProfileContent = styled.div`
  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  margin: 0 auto 32px;

  form {
    top: 120px;
    position: relative;
    margin: 40px 0;
    width: 340px;
    display: flex;
    flex-direction: column;
    align-items: center;

    place-content: center;

    padding-bottom: 32px;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    a {
      color: var(--letter-color-3);
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.15s;
      box-shadow: var(--box-shadow);

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

export const AvatarInput = styled.div`
  position: fixed;
  top: 16px;
  width: 186px;
  margin: 0 auto 32px;
  z-index: 10;
  align-self: center;

  > img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
    box-shadow: var(--box-shadow);
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: var(--primary-color);
    border-radius: 50%;
    bottom: 0;
    right: 1%;
    border: none;
    transition: background-color 0.4s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    input {
      display: none;
    }

    svg {
      width: 24px;
      height: 24px;
      color: var(--letter-color-4);
    }

    &:hover {
      background-color: ${shade(0.3, '#ff9000')};
    }
  }
`;

export const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  button {
    margin: 8px auto;
    background: transparent;
    color: var(--letter-color-2);
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transition: 0.2s;

    svg {
      margin-top: 4px;
    }

    &:hover {
      color: var(--primary-color);
    }
  }
`;
