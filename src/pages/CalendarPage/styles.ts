import styled from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  display: flex;
  padding-bottom: 32px;
`;

export const Body = styled.div`
  width: 100%;
  padding: 0 40px;

  margin-top: 8.5vh;

  display: flex;
  flex-direction: column;
  gap: 32px;

  align-items: center;
  justify-content: center;

  @media (max-width: 1000px) {
    padding: 0 8px;
    gap: 16px;
  }

  h1 {
    text-align: center;
    color: var(--primary-color);
    border-bottom: 1px solid var(--title-color);
    width: 264px;
  }
`;

export const ArrowContainer = styled.div`
  svg {
    display: none;
    @media (max-width: 1000px) {
      display: unset;
    }
  }
`;

export const FirstSection = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  /* display: flex; */
  align-items: center;
  justify-content: stretch;
  gap: 16px;

  @media (max-width: 1000px) {
    overflow-x: scroll;
  }
`;
export const Section = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: stretch;
  gap: 16px;

  @media (max-width: 1000px) {
    overflow-x: scroll;
  }
`;

export const Appointments = styled.div`
  display: flex;
  flex-direction: column;
  height: 40vh;
  min-height: 320px;
  min-width: 320px;
  border-radius: 8px;
  border: 1px solid var(--primary-color);
  padding: 16px;

  background: var(--header-background-color);

  gap: 4px;

  overflow-y: scroll;

  h3 {
    text-align: center;
    width: 100%;
    height: 40px;
    margin: 0 auto 0 auto;
    /* border-bottom: 1px solid var(--title-color); */
  }
`;
