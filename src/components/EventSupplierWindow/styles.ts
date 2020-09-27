import styled from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  > div {
    width: 100%;
    display: flex;
    gap: 24px;
    flex-direction: column;

    > h2 {
      color: var(--letter-color-2);
    }

    > div {
      width: 100%;
      padding: 24px;
      display: flex;
      gap: 24px;

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
        height: 40px;
        justify-content: content;
        gap: 20px;
        padding-left: 32px;
        position: relative;
        transition: 0.5s;
        margin: auto;

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
    }
  }
`;

export const Contracts = styled.span`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 400px;
  overflow-y: scroll;
  gap: 16px;

  > button {
    background: var(--card-color);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    width: 100%;
    gap: 16px;
    color: var(--primary-color);

    > h2 {
      font-size: 24px;
      font-weight: 500;
      color: var(--letter-color-5);
    }

    > h1 {
      font-size: 24px;
      color: var(--primary-color);
    }

    > div {
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;

      > p {
        font-size: 16px;
        color: var(--letter-color-5);
      }

      > svg {
        margin-left: auto;
      }
    }
  }
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: var(--primary-color);
  border: none;
  height: 40px;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  color: var(--letter-color-4);
  font-weight: 500;
  padding: 16px;
  transition: 0.5s;

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
