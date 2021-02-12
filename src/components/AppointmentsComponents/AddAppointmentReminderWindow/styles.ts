import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: stretch;

  gap: 4vh;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: stretch;

  gap: 4vh;
`;

export const TypeButton = styled.button`
  background: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 4px;
  height: 40px;
  width: 100%;
  box-shadow: var(--box-shadow);
  transition: 0.3s;

  &:hover {
    background: var(--secondary-color);
    color: var(--primary-color);
    box-shadow: var(--window-box-shadow);
  }
`;

export const SaveButton = styled.button`
  background: var(--green-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 4px;
  height: 40px;
  width: 100%;
  box-shadow: var(--window-box-shadow);
  transition: 0.3s;

  &:hover {
    background: var(--primary-color);
    color: var(--secondary-color);
    box-shadow: var(--box-shadow);
  }
`;
