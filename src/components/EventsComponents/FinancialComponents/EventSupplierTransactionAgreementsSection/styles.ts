import styled from 'styled-components';

export const Container = styled.div`
  min-height: 65%;
  width: 100%;
`;

export const Title = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: var(--letter-color-6);
  text-align: center;
`;

export const AgreementsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  border-radius: 16px;
  width: 100%;
  flex: 1;
  max-height: 90%;
  padding: 2px;
  background-color: #f3f2f2;
  border-radius: 8px;
  border: 0.4px solid #e1e0e0;
  overflow-y: scroll;

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
`;
