import styled from 'styled-components';
import Tooltip from '../Tooltip';

export const Container = styled.div`
  width: 100%;
  height: 26px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;

  > div {
    display: flex;
    gap: 16px;
    margin-right: auto;

    > h2 {
      text-align: left;
      width: 200px;
      font-size: 16px;
      color: var(--letter-color-4);
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
