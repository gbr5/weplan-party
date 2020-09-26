import styled from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > img {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.2);
  }

  > button {
    background: transparent;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: 200px;
    justify-content: content;
    gap: 20px;
    padding-left: 32px;
    position: relative;
    transition: 0.5s;

    &:hover {
      opacity: 0.8;

      > svg {
        color: var(--green-icon);
      }
    }

    > svg {
      position: absolute;
      top: 0;
      right: 32px;
      color: var(--title-color);
      transition: 0.5s;
    }

    > h1 {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      font-size: 24px;
      color: var(--primary-color);

      > strong {
        color: var(--title-color);
      }
    }

    > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 16px;

      > h2 {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;

        font-size: 22px;
        color: var(--primary-color);

        > strong {
          color: var(--title-color);
        }
      }
    }
  }

  > div {
    display: flex;
    align-items: center;
    width: 100%;
  }
`;

export const EditOwnerButton = styled.button`
  background: var(--primary-color);
  border: none;
  height: 40px;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.2);
  transition: 0.4s;

  &:hover {
    opacity: 0.8;
    box-shadow: 0px 0px 3px 2px rgba(255, 150, 10, 0.3);
  }
  > svg {
    color: var(--green-icon);
  }
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: var(--letter-color-4);
  border: none;
  height: 40px;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  color: var(--title-color);
  font-weight: 500;

  &:hover {
    opacity: 0.8;
    background: var(--red-color);
    box-shadow: 0px 0px 3px 2px rgba(255, 150, 10, 0.3);
    color: var(--title-color);

    > svg {
      color: var(--title-color);
    }
  }
  > svg {
    color: var(--red-icon);
    transition: 0.3s;
  }
`;
