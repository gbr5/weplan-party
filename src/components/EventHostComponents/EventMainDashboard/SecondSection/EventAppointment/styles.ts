import styled from 'styled-components';

export const Container = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: stretch;
  width: 100%;
  height: 48px;
  padding: 4px;
  gap: 8px;
  background: inherit;
  border: none;

  img {
    height: 40px;
    border-radius: 4px;
  }

  p {
    font-weight: 500;
  }
`;
