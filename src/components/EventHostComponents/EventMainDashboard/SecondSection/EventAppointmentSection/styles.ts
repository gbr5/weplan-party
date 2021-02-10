import styled from 'styled-components';

export const Container = styled.div`
  width: 360px;
  height: 400px;
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  gap: 2px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  position: relative;

  h1 {
    border-bottom: 1px solid var(--title-color);
    width: 100%;
    text-align: center;
    margin: 2vh auto 0;
  }

  span {
    display: flex;
    gap: 2vh;
    width: 100%;

    p {
      width: 100%;
      font-size: 14px;
    }
  }

  @media (max-width: 1000px) {
    margin: 1vh auto 2vh;
    padding: 0;
    border-bottom: 1px solid var(--secondary-color);
  }
`;
