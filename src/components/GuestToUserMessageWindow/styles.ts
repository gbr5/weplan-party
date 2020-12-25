import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 4fr;
  justify-content: flex-end;
  align-items: center;
  gap: 32px;

  box-sizing: border-box;
`;

export const SideMenu = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-right: auto;
  align-items: stretch;
  justify-content: stretch;

  img {
    height: 160px;
    width: 100%;
    border-radius: 8px;
    box-shadow: var(--box-shadow);
  }

  > h2 {
    display: flex;
    strong {
      margin-right: 16px;
      border-bottom: 1px solid var(--primary-color);
      font-weight: 500;
      color: var(--letter-color-4);
    }
    text-align: left;
    width: 100%;
    font-size: 16px;
    color: var(--primary-color);
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5rem;
    background: transparent;
    border: none;
    border-radius: 8px;
    transition: 0.3s;
    box-shadow: var(--box-shadow);

    &:hover {
      box-shadow: var(--box-shadow-hover);
      background-color: rgba(255, 125, 25, 0.2);
    }
  }
`;

export const Body = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  gap: 16px;
  margin-right: auto;
  background: var(--letter-color-2);
  padding: 16px;
  align-items: flex-start;
  justify-content: start;
  border-radius: 8px;

  > h2 {
    text-align: left;
    width: 200px;
    font-size: 16px;
    color: var(--letter-color-4);
  }
`;

interface IMessageProps {
  isUser: boolean;
}

export const Message = styled.div<IMessageProps>`
  margin: auto 40px auto 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-right: auto;
  background: rgba(255, 225, 200, 0.9);
  width: 100%;
  border-radius: 8px;

  padding: 8px;

  > h1 {
    text-align: left;
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.8);
  }
  > h3 {
    text-align: left;
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    color: var(--letter-color-5);

    strong {
      margin-right: 16px;
      width: 150px;
      border-bottom: 1px solid var(--secondary-color);
      font-weight: 700;
    }
  }
  > p {
    text-align: left;
    width: 100%;
    font-size: 12px;
    color: var(--letter-color-5);
    strong {
      margin-right: 16px;
      width: 150px;
      font-size: 14px;
      border-bottom: 1px solid var(--secondary-color);
      font-weight: 600;
    }
  }

  div {
    > h3 {
      text-align: left;
      font-size: 14px;
      color: var(--letter-color-5);

      border-bottom: 1px solid var(--title-color);
      font-weight: 700;
    }
  }

  ${props =>
    props.isUser &&
    css`
      margin: auto 0 auto 40px;
      background: rgba(255, 95, 50, 0.9);
    `}
`;
