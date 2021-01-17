import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  width: 100%;
  border-radius: 4px;
  background: var(--primary-color);
  color: var(--secondary-color);
  box-shadow: var(--box-shadow);
  transition: 0.3s;

  border: 1.5px solid var(--secondary-color);

  &:hover {
    color: var(--primary-color);
    background: var(--secondary-color);
    box-shadow: var(--window-box-shadow);
  }
`;
