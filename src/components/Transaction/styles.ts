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

    @media (max-width: 1000px) {
      gap: 2vw;
      margin: 2vh auto;
    }

    > h2 {
      text-align: left;
      width: 200px;
      font-size: 16px;
      color: var(--letter-color-4);

      @media (max-width: 1000px) {
        width: 100%;
      }
    }
  }
`;

export const TransactionDate = styled(Tooltip)`
  display: flex;
  gap: 16px;
  align-items: right;
  justify-content: right;
  margin-left: auto;
  width: 100%;

  @media (max-width: 1000px) {
    gap: 2vw;
  }

  > h3 {
    color: var(--primary-color);
    margin-right: 16px;
    margin-left: auto;

    @media (max-width: 1000px) {
      width: 100%;
    }
  }
  > p {
    font-size: 16px;
    color: var(--letter-color-4);

    @media (max-width: 1000px) {
      width: 100%;
    }
  }
  > button {
    background: transparent;
    border: none;

    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;

    @media (max-width: 1000px) {
      gap: 2vw;
    }

    color: var(--letter-color-5);
    font-weight: 500;
    font-size: 20px;
  }
`;
