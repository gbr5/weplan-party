import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  width: 100%;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > div {
    display: flex;
    width: 100%;
    gap: 16px;

    button {
      background: var(--primary-color);
      border: none;
      height: 40px;
      width: 100%;
      font-weight: 500;
      border-radius: 4px;

      &:hover {
        opacity: 0.8;
        box-shadow: 2px 2px 5px 3px rgba(255, 150, 10, 0.3);
      }
    }
  }
`;
