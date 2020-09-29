import styled from 'styled-components';
import Tooltip from '../Tooltip';

export const Container = styled.div`
  width: 100%;
  height: 26px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;

  > h2 {
    font-size: 16px;
    color: var(--letter-color-4);
    margin-right: auto;
  }
`;

export const TransactionDate = styled(Tooltip)`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  margin-right: 16px;

  > h3 {
    color: var(--primary-color);
    margin-right: 16px;
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
