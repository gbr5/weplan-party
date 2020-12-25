import styled from 'styled-components';
import Tooltip from '../../Tooltip';

export const EventButton = styled.button`
  background: none;
  width: 100%;
  color: var(--title-color);
`;

export const EventSettingsButton = styled.button`
  background: transparent;
  border: none;
  width: 100%;

  &:hover {
    color: var(--title-color);
    h3 {
      color: var(--title-color);
    }
  }

  h3 {
    color: var(--letter-color-4);
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
  border-bottom: 1px solid var(--letter-color-4);
  transition: 0.25s;

  > svg {
    color: var(--title-color);
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
        color: var(--letter-color-1);
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
      }
    }
  }
`;

export const EventDate = styled(Tooltip)`
  display: flex;
  gap: 16px;
  align-items: right;
  justify-content: right;
  margin-left: auto;
  width: 100%;

  > h3 {
    color: var(--primary-color);
    margin-right: 16px;
    margin-left: auto;
  }
  > p {
    font-size: 16px;
    color: var(--letter-color-4);
  }
  > button {
    background: transparent;
    border: none;

    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;

    color: var(--letter-color-5);
    font-weight: 500;
    font-size: 20px;
  }
`;
