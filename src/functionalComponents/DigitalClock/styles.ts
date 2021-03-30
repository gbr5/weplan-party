import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--title);

  gap: 32px;

  position: absolute;
  border: 1px solid var(--letter-color-2);
  padding: 1rem;
  border-radius: 16px;

  p {
    font-size: 104px;
  }

  section {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 16px;
    max-height: 120px;
    overflow-y: hidden;
  }
`;
