import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  padding-top: 24px;
  width: 100%;
  border-radius: 8px;
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
`;

export const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-height: 600px;
  margin: 8px 0;
  padding: 0 4px;
  padding-bottom: 32px;
  background-color: var(--letter-color-1);
  border-radius: 8px;
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  overflow-y: scroll;
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
