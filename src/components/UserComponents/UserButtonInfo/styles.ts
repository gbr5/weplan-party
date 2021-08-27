import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  border: 0.3px solid var(--letter-color-2);
  border-radius: 5px;
  padding-top: 24px;
  top: -20px;
  padding-bottom: 4px;
`;

export const ContactsMenu = styled.div`
  height: 80px;
`;

export const Name = styled.p`
  color: var(--letter-color-6);
  font-size: 14px;
  margin-top: 16px;
`;

export const NameContainer = styled.div`
  width: 100%;
  flex-direction: row;
  margin: 16px 0;
  align-items: center;
  justify-content: center;
`;

export const ContactButton = styled.button`
  width: 80px;
  height: 80px;
`;

export const Label = styled.p`
  position: absolute;
  top: -16px;
  left: 8px;
  font-size: 14px;
  color: var(--secondary-color);
`;
