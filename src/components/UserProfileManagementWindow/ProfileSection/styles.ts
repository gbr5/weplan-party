import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  transition: 0.25s;
  width: 100%;
  height: 550px;
  gap: 16px;
  overflow-y: scroll;

  h2 {
    width: 100%;
    text-align: center;
    border-bottom: 0.5px solid var(--primary-color);
    font-size: 24px;
    margin: 16px auto;
    color: var(--title-color);
  }

  > button {
    width: 100%;
    height: 60px;
    display: flex;
    gap: 24px;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--secondary-color);
    transition: 0.5s;
    background: var(--primary-color);
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
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 64px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    /* display: grid;
    grid-template-rows: repeat(11, 1fr); */
    /* padding: 2vh; */
    align-items: stretch;
    justify-content: stretch;
    overflow-x: scroll;
  }
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--title-color);
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.8px;
  }
`;

export const InfoInputContainer = styled.div`
  margin: 8px auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 88px;
  gap: 8px;
  padding: 8px;

  button {
    background: rgba(0, 0, 0, 0.5);
    border: none;
    margin: auto;
    gap: 5px;
    width: 250px;
    height: 100%;
    border-radius: 8px;
    color: var(--letter-color-3);
    transition: 0.5s;
    box-shadow: var(--window-box-shadow);
    overflow-x: scroll;

    &:hover {
      box-shadow: var(--box-shadow);
    }
  }
  p {
    width: 100%;
    display: flex;
    text-align: center;
    justify-content: center;
    color: var(--title-color);
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.8px;
    gap: 8px;

    img {
      height: 20px;
    }

    a {
      display: flex;
      align-items: flex-start;
      justify-content: start;
      height: 16px;

      svg {
        margin-bottom: 16px;
        color: var(--primary-color);
        transition: 0.3s;

        &:hover {
          box-shadow: var(--window-box-shadow);
          border-radius: 8px;
          background: var(--secondary-color);
          color: var(--title-color);
          width: 24px;
        }
      }
    }
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

export const AddressInfoInputContainer = styled.div`
  margin: 8px auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 88px;
  gap: 8px;
  padding: 8px;

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
    overflow-x: scroll;

    &:hover {
      box-shadow: var(--box-shadow);
    }
  }
  p {
    width: 100%;
    display: flex;
    text-align: center;
    justify-content: center;
    color: var(--title-color);
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.8px;
    gap: 8px;

    img {
      height: 20px;
    }

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

export const InfoSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: stretch;
  justify-content: stretch;
  transition: 0.25s;
  width: 100%;
  height: 100%;
  gap: 4vh;

  @media (max-width: 1000px) {
    /* display: flex;
    flex-direction: column; */
    display: block;
    /* grid-template-rows: repeat(11, 1fr); */
    /* padding: 2vh; */
    align-items: stretch;
    justify-content: stretch;
    overflow-x: scroll;
  }
`;
