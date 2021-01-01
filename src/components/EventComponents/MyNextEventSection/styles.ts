import styled from 'styled-components';
import '../../../styles/global';

export const Container = styled.section`
  background: var(--header-background-color);
  padding: 24px;
  border-radius: 8px;
  height: 220px;
  box-shadow: 1px 1px 10px 5px rgba(100, 90, 10, 0.2);

  margin-bottom: 2vh;
  position: relative;

  > button {
    background: transparent;
    border: none;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  span {
    position: absolute;
    top: 24px;
    right: 24px;
    color: var(--primary-color);
    font-size: 18px;
  }

  @media (max-width: 650px) {
    height: 100%;

    span {
      top: 4px;
      right: 4px;
    }
  }
`;

export const MyNextEventTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  width: 80%;
  border-bottom: 1px solid var(--primary-color);

  > strong {
    color: var(--letter-color-2);
    font-size: 20px;
    line-height: 26px;
    display: block;
  }

  h2 {
    margin-left: 24px;
    color: var(--title-color);
  }

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

export const Section = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  @media (max-width: 650px) {
    display: flex;
    flex-direction: column;
    gap: 4vh;
    /* grid-template-rows: repeat(5, 1fr); */
  }
`;

export const Fields = styled.div`
  background-color: var(--card-color);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 90%;
  border-radius: 10px;
  position: relative;

  p {
    position: absolute;
    top: 8px;
    left: 8px;
  }

  h2 {
    font-size: 32px;
    color: var(--primary-color);
    margin-top: 16px;
  }
`;
