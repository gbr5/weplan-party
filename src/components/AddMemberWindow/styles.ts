import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
    margin-bottom: 32px;
  }

  button {
    margin-top: 24px;
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 91.5%;
    border-radius: 4px;
  }
`;
