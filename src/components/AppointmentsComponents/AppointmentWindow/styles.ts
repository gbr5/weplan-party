import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4vh;
  width: 100%;
  text-align: center;

  align-items: center;
  justify-content: stretch;
  margin: 24px 24px 32px 16px;

  h1 {
    width: 100%;
    font-size: 24px;
    color: var(--primary-color);
  }

  span {
    display: flex;
    position: relative;
    width: 100%;
  }

  h3 {
    width: 100%;
    font-size: 20px;
    color: var(--primary-color);
    line-height: 32px;
  }

  p {
    line-height: 32px;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4vh;
  width: 100%;

  text-align: center;

  align-items: center;
  justify-content: stretch;

  position: relative;

  a {
    text-decoration: none;
    font-size: 18px;
    color: var(--title-color);
    border-bottom: 1px solid var(--primary-color);

    &:hover {
      color: var(--primary-color);
      border-bottom: 1px solid var(--title-color);
    }
  }
`;

export const AddButton = styled.button`
  position: absolute;
  top: 0;
  right: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 4px;

  &:hover {
    background: var(--secondary-color);
    color: var(--primary-color);
    box-shadow: var(--window-box-shadow);
  }
`;
