import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 8px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
  background-color: var(--letter-color-1);
  z-index: 2;
`;

export const FileContainer = styled.div`
  display: flex;
  padding: 8px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const FileName = styled.p`
  font-size: 16px;
  color: var(--letter-color-6);
  flex: 1;
  text-align: center;
  letter-spacing: 1px;
`;

export const EditButton = styled.button`
  display: flex;
  margin-left: 8px;
  width: 20%;
  padding: 4px;
  border-radius: 4px;
  align-items: center;
  justify-content: space-between;
  border: none;
  background-color: transparent;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);

  a {
    width: 100%;
    text-decoration: none;
    color: var(--letter-color-6);
  }
`;

export const CreatedAtContainer = styled.div`
  display: flex;
  padding: 4px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const CreatedAt = styled.p`
  font-size: 16px;
  color: var(--letter-color-4);
  letter-spacing: 1px;
`;

export const Underline = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: var(--letter-color-3);
`;
