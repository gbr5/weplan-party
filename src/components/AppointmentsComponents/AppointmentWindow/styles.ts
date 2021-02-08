import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  text-align: center;

  align-items: center;
  justify-content: stretch;

  h3 {
    width: 100%;
    font-size: 24px;
    color: var(--primary-color);
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4vh;
  width: 100%;

  text-align: center;

  align-items: center;
  justify-content: stretch;

  position: relative;
`;

export const AddButton = styled.button`
  position: absolute;
  top: 0;
  right: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 4px;

  &:hover {
    background: var(--secondary-color);
    color: var(--primary-color);
    box-shadow: var(--window-box-shadow);
  }
`;
