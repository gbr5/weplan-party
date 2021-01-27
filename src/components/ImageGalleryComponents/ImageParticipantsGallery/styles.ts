import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 8.5vh;
  align-items: center;
  justify-content: center;
  gap: 4px;

  button {
    width: 100%;

    img {
      max-width: 30vw;
    }
  }
`;
