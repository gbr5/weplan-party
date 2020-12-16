import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  transition: 0.25s;
  width: 100%;
  gap: 16px;

  > button {
    margin-top: 8px;
    width: 100%;
    display: flex;
    gap: 24px;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--secondary-color);
    transition: 0.5s;
    background: var(--primary-color);
    height: 40px;
    border-radius: 4px;
    margin-bottom: 8px;
    transition: 0.5s;
    box-shadow: var(--box-shadow);

    font-weight: 500;
    font-size: 20px;

    &:hover {
      color: var(--primary-color);
      background: var(--secondary-color);
      box-shadow: var(--window-box-shadow);
    }
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  gap: 16px;

  text-align: center;

  > h1 {
    font-size: 32px;
    color: var(--title-color);
  }
  p {
    color: var(--letter-color-2);
    font-size: 16px;

    strong {
      color: var(--primary-color);
      font-weight: 500;
      border-bottom: 0.2px solid var(--title-color);
    }
  }
`;
export const Body = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
`;
export const ButtonContainer = styled.span`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  > button {
    width: 100%;
    display: flex;
    gap: 24px;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--secondary-color);
    transition: 0.5s;
    background: var(--primary-color);
    height: 40px;
    border-radius: 4px;
    margin-bottom: 8px;
    transition: 0.5s;
    box-shadow: var(--box-shadow);

    font-weight: 500;
    font-size: 20px;

    &:hover {
      color: var(--primary-color);
      background: var(--secondary-color);
      box-shadow: var(--window-box-shadow);
    }
  }
`;

export const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  width: 100%;
  height: 64px;
  align-items: center;
  justify-content: center;
  gap: 8px;

  p {
    color: var(--title-color);
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.8px;
  }
`;

export const InfoInputContainer = styled.div`
  margin: 8px auto;
  display: grid;
  grid-template-rows: 1fr 4fr;
  width: 100%;
  height: 88px;
  gap: 8px;

  button {
    background: rgba(0, 0, 0, 0.5);
    border: none;
    margin: auto;
    gap: 5px;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    color: var(--letter-color-3);
    transition: 0.5s;
    box-shadow: var(--window-box-shadow);

    &:hover {
      box-shadow: var(--box-shadow);
    }
  }
  p {
    width: 100%;
    display: flex;
    text-align: center;
    color: var(--title-color);
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.8px;

    button {
      background: transparent;
      border: none;
      margin: auto;
      transition: 0.8s;
      box-shadow: var(--box-shadow);

      svg {
        border-bottom: 0.2px solid rgba(0, 0, 0, 0.5);
        box-shadow: var(--box-shadow);
        border-radius: 16px;
        background: rgba(0, 0, 0, 0.2);
        transition: 0.8s;
      }
      &:hover {
        color: var(--red-color);
        width: 100%;
        box-shadow: var(--window-box-shadow);

        svg {
          margin: auto 8%;
          border-bottom: 0.5px solid var(--title-color);
          box-shadow: var(--box-shadow);
          border-radius: 16px;
          background: rgba(0, 0, 0, 0.4);
        }
      }
    }
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  transition: 0.25s;
  width: 100%;
  gap: 16px;

  h2 {
    width: 100%;
    text-align: center;
    border-bottom: 0.5px solid var(--primary-color);
    font-size: 24px;
    margin: 16px auto;
    color: var(--title-color);
  }
`;

export const InfoSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 3fr;
  align-items: stretch;
  justify-content: stretch;
  transition: 0.25s;
  width: 100%;
  gap: 8px;
`;
