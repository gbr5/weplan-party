import styled from 'styled-components';
import '../../styles/global';

export const EventInfoForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--header-background-color);
  border-radius: 8px;
  padding: 32px;
  gap: 16px;

  @media (max-width: 1000px) {
    display: block;
  }

  span {
    position: absolute;
    top: 0;
    right: 8px;
    > button {
      background: transparent;
      border: none;

      svg {
        color: red;
      }
    }
  }

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    @media (max-width: 1000px) {
      display: block;
      margin: 4vh auto;
    }

    > div {
      display: flex;
      flex-direction: column;
      gap: 16px;

      @media (max-width: 1000px) {
        margin: 2vh auto;
      }
      > input {
        height: 40px;
        width: 100%;
        border-radius: 4px;
        padding: 0 16px;
        border: none;
      }
    }
  }

  button {
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 100%;
    border-radius: 4px;
  }
`;
