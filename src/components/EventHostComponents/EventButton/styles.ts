import styled from 'styled-components';

export const Container = styled.div`
  list-style: none;
  padding: 14px 8px 12px;
  display: flex;
  gap: 24px;
  align-items: center;
  transition: 0.25s;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  background-color: var(--letter-color-1);
  border-radius: 5px;
  margin: 8px 4px;

  &:hover {
    box-shadow: 0 0 3px 3px rgba(250, 120, 0, 0.25);
    background-color: var(--letter-color-2);
    > svg {
      color: var(--primary-color);
    }

    div {
      button {
        color: var(--primary-color);
      }
    }
  }

  > button {
    background: transparent;
    border: none;
    text-align: left;
    width: 100%;

    &:hover {
      color: var(--primary-color);
      h3 {
        color: var(--primary-color);
      }
    }

    h3 {
      color: var(--letter-color-4);

      @media (max-width: 1000px) {
        font-size: 12px;
      }
    }
  }

  > svg {
    color: var(--primary-color);
    width: 32px;
  }

  span {
    display: flex;
    margin-left: auto;
    color: var(--primary-color);
    gap: 16px;

    > button {
      color: var(--red-color);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8%;
      border: none;
      transition: 0.25s;
      background: transparent;

      > svg {
        margin: auto;
        color: var(--letter-color-6);

        &:hover {
          color: var(--title-color);
        }
      }
    }
  }

  > div {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    > button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      background: transparent;
      border: none;
      transition: 0.25s;
      border-radius: 1%;
      width: 100%;
    }

    span {
      margin-left: 4px;
      color: var(--primary-color);

      > button {
        margin: auto 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        transition: 0.25s;

        &:hover {
          color: var(--title-color);
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
`;

export const DateSection = styled.div`
  width: 150px;
  color: var(--primary-color);

  @media (max-width: 1000px) {
    width: 50px;
    font-size: 12px;
  }
`;
