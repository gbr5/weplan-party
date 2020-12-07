import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 0 0 8px 8px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px;

  > span {
    background-color: rgba(255, 144, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--letter-color-3);
    margin: 8px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 16px;

    h2 {
      font-size: 16px;
      color: var(--title-color);
      margin-bottom: 8px;
    }

    input {
      border: 1px solid var(--primary-color);
      border-radius: 4px;
      width: 300px;
      height: 32px;
    }

    button {
      margin-left: auto;
      margin-top: 16px;
      background: transparent;
      padding: 8px;
      border-radius: 8px;
      border: none;

      > h3 {
        color: var(--title-color);
        font-size: 16px;
      }

      &:hover {
        border: 1px solid var(--title-color);
      }
    }

    &:hover {
      background-color: rgba(255, 144, 0, 0.15);
    }
  }
`;
