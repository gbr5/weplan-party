import styled from 'styled-components';
import '../../../styles/global';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 16px;
  padding: 8px;
  margin: 48px 0 32px;
  background-color: var(--letter-color-1);
`;

export const Title = styled.p`
  padding: 5px;
  font-size: 24px;
  color: var(--letter-color-6);
  font-weight: bold;
  margin-right: 12px;
  text-align: center;
`;

export const QuestionText = styled.p`
  font-size: 20px;
  color: var(--letter-color-6);
  margin: 8px 0 8px;
`;

export const Underline = styled.div`
  height: 2px;
  width: 100%;
  background-color: var(--primary-color);
  border-radius: 2px;
`;
