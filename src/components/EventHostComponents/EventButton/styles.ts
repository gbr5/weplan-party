import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  list-style: none;
  padding: 14px 8px 12px;
  display: flex;
  gap: 24px;
  align-items: center;
  transition: 0.25s;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  background-color: var(--letter-color-1);
  border-radius: 5px;
  margin: 8px 4px;

  &:hover {
    box-shadow: 0 0 3px 3px rgba(250, 120, 0, 0.25);
  }
`;

export const DateSection = styled.p`
  color: var(--primary-color);
  font-weight: 500;
  letter-spacing: 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const Body = styled.button`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
`;

export const IconButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
`;

export const CreatedAt = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  color: var(--letter-color-4);
`;

export const Name = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: var(--letter-color-6);
  font-weight: 500;
  font-size: 20px;
  margin: 12px 0;
`;
