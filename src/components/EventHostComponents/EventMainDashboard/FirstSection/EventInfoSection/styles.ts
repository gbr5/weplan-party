import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: block;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  padding: 1vh;
  overflow-y: scroll;
  position: relative;

  h1 {
    border-bottom: 1px solid var(--title-color);
    width: 100%;
    text-align: center;
    margin: 2vh auto 4vh;
  }

  span {
    display: grid;
    grid-template-columns: 2fr 3fr;
    align-items: stretch;
    justify-content: stretch;
    gap: 2vh;
    margin: 2vh auto;

    p {
      font-size: 14px;
    }
  }

  @media (max-width: 1000px) {
    margin: 1vh auto 2vh;
    padding: 0;
    border-bottom: 1px solid var(--secondary-color);
  }
`;

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  border: none;
  padding: 8px;

  position: absolute;
  top: 0;
  right: 8px;
`;
