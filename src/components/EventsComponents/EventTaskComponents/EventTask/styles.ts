import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 8px;
  background-color: var(--letter-color-1);
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin-top: 8px;
  border: 0.5px solid var(--letter-color-3);
  z-index: 2;
`;

export const Title = styled.p`
  font-size: 16px;
  color: var(--letter-color-6);
  flex: 1;
  text-align: center;
  letter-spacing: 1px;
  margin-top: 4px;
  line-height: 26px;
  /* min-height: 32px; */
`;

export const Underline = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: var(--primary-color);
  margin-top: 8px;
`;
