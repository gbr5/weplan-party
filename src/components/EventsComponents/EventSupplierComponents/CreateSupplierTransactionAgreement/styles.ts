import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  width: 100%;
`;

export const FormContainer = styled.div`
  width: 100%;
`;

export const Title = styled.p`
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 24px;
  color: var(--letter-color-6);
  margin: 16px 0 4px;
`;

export const Underline = styled.div`
  height: 3px;
  width: 80%;
  border-radius: 2px;
  background-color: var(--primary-color);
  margin-bottom: 12px;
`;

export const SupplierContainer = styled.div`
  width: 100%;
`;

export const SupplierText = styled.p`
  font-size: 18px;
  color: var(--letter-color-6);
`;

export const SupplierName = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: var(--letter-color-6);
  margin: 4px 0 8px;
  text-align: center;
`;

export const Question = styled.p`
  font-size: 18px;
  color: var(--letter-color-2);
  margin: 8px 0px 4px;
`;
