import styled from 'styled-components';

export const Container = styled.div`
  overflow-y: scroll;
  background-color: var(--letter-color-1);
  padding: 16px;
  padding-top: 32px;
  border-radius: 8px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.3);
  flex: 1;
  width: 100%;
  margin: 24px 0;
`;

export const Space = styled.div`
  width: 100%;
  height: 24px;
`;

export const Title = styled.p`
  font-size: 17px;
  color: var(--letter-color-6);
  margin: 12px 0 8px;
`;

export const Description = styled.p`
  font-size: 16px;
  color: var(--letter-color-6);
  text-align: center;
  margin-top: 16px;
  line-height: 26px;
  letter-spacing: 1px;
`;
