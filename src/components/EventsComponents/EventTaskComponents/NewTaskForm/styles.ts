import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  align-items: center;
  width: 100%;
`;

export const Title = styled.p`
  font-size: 12px;
  color: var(--letter-color-6);
  text-align: center;
`;

export const Underline = styled.div`
  height: 2px;
  border-radius: 2px;
  margin: 2px 0 6px;
  width: 100%;
  background-color: var(--letter-color-6);
`;

export const FormQuestion = styled.p`
  margin: 8px 0;
  font-size: 20px;
  color: var(--letter-color-6);
`;

export const DateContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const DateButton = styled.button`
  border-radius: 5px;
  background-color: var(--letter-color-1);
  padding: 12px;
  align-items: center;
  justify-content: center;
  width: 47%;
`;

export const DateText = styled.p`
  font-size: 20px;
  color: var(--letter-color-6);
`;

export const TimeText = styled.p`
  font-size: 20px;
  color: var(--letter-color-6);
`;
