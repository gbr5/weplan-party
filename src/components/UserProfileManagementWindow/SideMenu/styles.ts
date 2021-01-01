import { shade } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  transition: 0.25s;
  width: 100%;
  gap: 16px;
`;
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  h2 {
    margin: 0 auto;
    font-size: 24px;
    font-weight: 500;
    color: var(--primary-color);
  }

  /* button {
    background: transparent;
    border: none;
    > img {
      height: 200px;
      width: 200px;
      border-bottom: 0.2px solid var(--title-color);
    }
  } */
`;

export const AvatarInput = styled.div`
  position: relative;
  /* top: 16px; */
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
interface IButtonProps {
  isActive: boolean;
}
export const BooleanButton = styled.button<IButtonProps>`
  margin-top: 8px;
  width: 100%;
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--secondary-color);
  transition: 0.5s;
  background: var(--primary-color);
  height: 40px;
  border-radius: 4px;
  margin-bottom: 8px;
  transition: 0.3s;
  box-shadow: var(--box-shadow);

  font-weight: 500;
  font-size: 20px;

  &:hover {
    color: var(--primary-color);
    background: var(--secondary-color);
    box-shadow: var(--window-box-shadow);
  }

  ${props =>
    props.isActive &&
    css`
      opacity: 0.8;
      background: var(--background-color);
      color: var(--primary-color);
      transition: 0.3s;
      border-bottom: 1px solid var(--title-color);
      box-shadow: var(--window-box-shadow);

      &:hover {
        box-shadow: var(--box-shadow);
        background: var(--primary-color);
        color: var(--background-color);
        opacity: 1;
      }
    `}
`;

export const InfoSection = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  align-items: stretch;
  justify-content: stretch;
  transition: 0.25s;
  width: 100%;
  gap: 8px;

  button {
    height: 40px;
    width: 100%;
    background: var(--primary-color);
    color: var(--secondary-color);
    transition: 0.3s;
    border: none;
    box-shadow: var(--box-shadow);

    &:hover {
      color: var(--primary-color);
      background: var(--secondary-color);
      box-shadow: var(--window-box-shadow);
    }
  }
`;

export const InfoInputContainer = styled.div`
  margin: 8px auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 88px;
  gap: 8px;
  padding: 8px;

  button {
    background: rgba(0, 0, 0, 0.5);
    border: none;
    margin: auto;
    gap: 5px;
    width: 250px;
    height: 100%;
    border-radius: 8px;
    color: var(--letter-color-3);
    transition: 0.5s;
    box-shadow: var(--window-box-shadow);
    overflow-x: scroll;

    &:hover {
      box-shadow: var(--box-shadow);
    }
  }
  p {
    width: 100%;
    display: flex;
    text-align: center;
    justify-content: center;
    color: var(--title-color);
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.8px;
    gap: 8px;

    img {
      height: 20px;
    }

    a {
      display: flex;
      align-items: flex-start;
      justify-content: start;
      height: 16px;

      svg {
        margin-bottom: 16px;
        color: var(--primary-color);
        transition: 0.3s;

        &:hover {
          box-shadow: var(--window-box-shadow);
          border-radius: 8px;
          background: var(--secondary-color);
          color: var(--title-color);
          width: 24px;
        }
      }
    }
    button {
      background: transparent;
      border: none;
      margin: auto;
      transition: 0.8s;
      box-shadow: var(--box-shadow);

      svg {
        border-bottom: 0.2px solid rgba(0, 0, 0, 0.5);
        box-shadow: var(--box-shadow);
        border-radius: 16px;
        background: rgba(0, 0, 0, 0.2);
        transition: 0.8s;
      }
      &:hover {
        color: var(--red-color);
        width: 100%;
        box-shadow: var(--window-box-shadow);

        svg {
          margin: auto 8%;
          border-bottom: 0.5px solid var(--title-color);
          box-shadow: var(--box-shadow);
          border-radius: 16px;
          background: rgba(0, 0, 0, 0.4);
        }
      }
    }
  }
`;
