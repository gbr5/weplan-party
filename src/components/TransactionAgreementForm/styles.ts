import styled from 'styled-components';

export const BooleanButtons = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const TransactionsContainer = styled.div`
  display: block;
  overflow-y: scroll;

  button {
    width: 100%;
    height: 40px;
    border: none;
    background: var(--primary-color);
    color: var(--secondary-color);
    box-shadow: var(--box-shadow);
    border-radius: 4px;

    transition: 0.3s;

    &:hover {
      background: var(--secondary-color);
      color: var(--primary-color);
      box-shadow: var(--window-box-shadow);
    }
  }
`;
