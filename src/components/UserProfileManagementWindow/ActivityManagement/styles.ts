import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: block;
`;

export const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 4vh;

  width: 100%;
  padding: 2vh;

  h1 {
    color: var(--primary-color);
  }

  div {
    display: grid;
    padding: 8px 10vw;
    grid-template-columns: 2fr 5fr;
    align-items: center;
    justify-content: center;
    gap: 2vw;
    border: 1px var(--letter-color-2);
    border-radius: 4px;
    width: 100%;

    @media (max-width: 1000px) {
      display: flex;
      flex-direction: column;
    }

    button {
      width: 120px;
      height: 40px;
      background: var(--primary-color);
      color: var(--secondary-color);
      border: none;
      border-radius: 4px;
      transition: 0.3s;
      box-shadow: var(--box-shadow);
      padding: 2vh 1vw;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;

      &:hover {
        background: var(--secondary-color);
        color: var(--primary-color);
        box-shadow: var(--window-box-shadow);
      }
    }
  }
`;
