import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  flex: 1;
`;

export const ValueContainer = styled.div`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const Title = styled.p`
  color: var(--letter-color-6);
  font-size: 18px;
  margin-right: 8px;
`;

export const CurrentValue = styled.p`
  color: var(--letter-color-6);
  font-size: 18px;
`;
