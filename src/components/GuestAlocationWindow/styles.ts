import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 5fr;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;

  @media (max-width: 1000px) {
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
  }
  > h1 {
    font-size: 32px;
    color: var(--title-color);
    width: 100%;
    padding-bottom: 5px;
    border-bottom: 1px solid var(--primary-color);

    @media (max-width: 1000px) {
      font-size: 24px;
      padding-bottom: 0px;
    }
  }
`;

export const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const SubTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  align-items: stretch;
  justify-content: center;

  button {
    background: var(--red-color);
    font-size: 24px;
    font-weight: 500;
    color: var(--title-color);
    border: none;
    height: 40px;
    width: 100%;
    border-radius: 4px;
    box-shadow: var(--box-shadow);

    transition: 0.3s;

    @media (max-width: 1000px) {
      font-size: 16px;
    }

    &:hover {
      background: var(--background-color);
      color: var(--primary-color);
      box-shadow: var(--window-box-shadow);
    }
  }

  div {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    align-items: center;
    justify-content: center;
    @media (max-width: 1000px) {
      display: block;
    }
    div {
      width: 100%;
      display: flex;
      gap: 8px;
      align-items: center;
      justify-content: center;

      @media (max-width: 1000px) {
        display: grid;
        grid-template-columns: 4fr 1fr;
        margin: 2vh;
      }

      h3 {
        width: 100%;
        font-size: 16px;
        color: var(--primary-color);

        @media (max-width: 1000px) {
          font-size: 14px;
          text-align: left;
        }
      }
      strong {
        width: 100%;
        font-size: 24px;
        font-weight: 500;
        color: var(--title-color);

        @media (max-width: 1000px) {
          font-size: 14px;
        }
      }
    }
  }
`;
