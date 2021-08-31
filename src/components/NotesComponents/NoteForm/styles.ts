import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`;

export const TextAreaContainer = styled.div`
  width: 100%;
  min-height: 64px;
  padding: 16px;
  background: var(--letter-color-1);
  border-radius: 10px;
  border: 2px solid var(--letter-color4);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const TextAreaInput = styled.textarea`
  width: 100%;
  color: var(--letter-color-6);
  font-size: 16px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  padding: 8px;
`;

export const NumberOfCharacters = styled.p`
  color: var(--letter-color-6);
  font-weight: 500;
  font-size: 16px;
  position: absolute;
  bottom: 24px;
  right: 24px;
`;

export const SendButton = styled.button`
  display: flex;
  border-radius: 5px;
  padding: 4px;
  align-items: center;
  justify-content: center;
  /* background-color: var(--letter-color-1); */
  color: var(--letter-color-1);
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  background-color: var(--green-color);
  font-size: 32px;
`;
