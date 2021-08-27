import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  flex: 1;
  width: 100%;
`;

export const Title = styled.p`
  font-weight: bold;
  font-size: 24px;
  color: var(--letter-color-6);
`;

export const FormQuestion = styled.p`
  margin: 16px 0;
  font-weight: bold;
  font-size: 18px;
  color: var(--letter-color-4);
`;

export const BooleanField = styled.div`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin: 8px 0;
`;

export const BooleanButton = styled.button`
  color: var(--red-color);
`;

export const SupplierCategoryButton = styled.button`
  margin-top: 16px;
  padding: 16px;
  width: 100%;
  border-radius: 5px;
  background-color: var(--letter-color-4);
`;

export const SupplierCategoryButtonText = styled.p`
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  color: var(--letter-color-1);
`;

export const BooleanButtonTitle = styled.p`
  width: 90%;
  font-weight: bold;
  font-size: 20px;
  color: var(--letter-color-4);
`;
