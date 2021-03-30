import styled from 'styled-components';

export const Container = styled.div`
  background-color: transparent;
  border: none;
  font-size: 118px;
  height: 120px;
  color: var(--letter-color-1);

  margin: 1rem;

  @media (max-width: 900px) {
    overflow-y: hidden;
  }
`;

export const OutContainer = styled.span`
  display: flex;
  flex-direction: column;

  span {
    border: 2px solid rgba(255, 150, 50);
  }
`;
