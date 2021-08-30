import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  padding-top: 40px;
  width: 100%;
`;

export const FileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex: 1;
  height: 400px;
  margin: 8px 0;
  padding: 8px;
  padding-bottom: 32px;
  border-radius: 8px;
  border: none;
  background-color: var(--letter-color-1);
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: var(--primary-color);
`;

export const HeaderContainer = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  margin: 4px auto;
  max-width: 400px;
`;

export const FileButton = styled.button`
  display: flex;
  margin: 8px auto;
  width: 98%;
  max-height: 80px;
  padding: 8px;
  border-radius: 4px;
  align-items: center;
  justify-content: space-between;
  border: none;
  background-color: var(--letter-color-1);
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);

  &:hover {
    background-color: var(--letter-color-2);
    box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.3);
  }

  a {
    width: 100%;
    text-decoration: none;
    color: var(--letter-color-6);
  }
`;

export const Image = styled.img`
  border-radius: 5px;
  height: 64px;
  width: 64px;
`;

export const IconContainer = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const FileInput = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  box-shadow: var(--box-shadow);
  margin: 0 auto 32px;
  z-index: 10;
  align-self: center;

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: var(--primary-color);
    border-radius: 50%;
    bottom: 0;
    right: 1%;
    border: none;
    transition: background-color 0.4s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    input {
      display: none;
    }

    svg {
      width: 24px;
      height: 24px;
      color: var(--letter-color-4);
    }

    &:hover {
      background-color: ${shade(0.3, '#ff9000')};
    }
  }
`;
