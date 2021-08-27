import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  justify-content: flex-start;
`;

export const TextAreaContainer = styled.div`
  width: 100%;
  min-height: 64px;
  padding: 0 16px;
  background: var(--letter-color-1);
  margin: 16px 0 16px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  border: 2px solid var(--letter-color4);
`;

export const TextAreaInput = styled.textarea`
  flex: 1;
  color: var(--letter-color-6);
  font-size: 16px;
`;

export const NumberOfCharacters = styled.p`
  color: var(--letter-color-6);
  font-size: 16px;
`;

export const SendButtonText = styled.p`
  color: var(--letter-color-6);
  font-weight: bold;
  font-size: 20px;
`;

export const SendButton = styled.button`
  border-radius: 5px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
`;
