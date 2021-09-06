import styled from 'styled-components';

export const OutContainer = styled.div`
  position: relative;
  margin: auto 8px;
`;

export const Container = styled.div`
  min-height: 80px;
  min-width: 280px;
  justify-content: center;
  background-color: var(--letter-color-1);
  border-radius: 8px;
  padding: 0 16px;
`;

export const ContainerButton = styled.button`
  min-height: 80px;
  min-width: 280px;
  justify-content: center;
  background-color: var(--letter-color-1);
  border-radius: 8px;
  padding: 0 16px;
  margin: auto 8px;
`;

export const ContactType = styled.p`
  font-size: 18px;
  color: var(--primary-color);
  font-weight: bold;

  letter-spacing: 2px;
`;

export const ContactInfo = styled.p`
  font-weight: bold;
  font-size: 24px;
  color: var(--letter-color-6);
  letter-spacing: 1px;
  text-align: right;
`;
