import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  border-radius: 8px;
  width: 100%;
  align-items: center;
  justify-content: center;
  z-index: 8;
  margin: 8px auto;
  min-height: 32px;
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
`;

export const Title = styled.a`
  letter-spacing: 1px;
  text-decoration: none;
  font-size: 20px;
  color: var(--letter-color-6);
  flex: 1;
`;
