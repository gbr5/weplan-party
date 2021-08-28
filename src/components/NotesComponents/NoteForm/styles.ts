import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TextAreaContainer = styled.div`
  width: 100%;
  min-height: 64px;
  padding: 16px;
  background: var(--letter-color-1);
  margin: 16px 0 16px;
  border-radius: 10px;
  border: 2px solid var(--letter-color4);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  font-size: 16px;
  margin-top: 8px;
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
