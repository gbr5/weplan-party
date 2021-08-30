import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 24px auto 0;
  width: 100%;
  max-width: 500px;
`;

export const SubContainer = styled.div`
  background-color: var(--letter-color-1);
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 8px;
`;

export const Option = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
  border: none;
  background: transparent;
`;

export const Text = styled.p`
  font-size: 20px;
  color: var(--letter-color-6);
  font-weight: bold;
`;

export const CancelOption = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 1% 0 3%;
  padding: 8px;
  border-radius: 5px;
  border: none;
  background: transparent;
`;

export const CancelText = styled.p`
  font-size: 20px;
  color: var(--letter-color-6);
  font-weight: bold;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DateContainer = styled.div``;

export const DateTitle = styled.p`
  font-size: 20px;
  color: var(--letter-color-6);
  margin: 0 0 5%;
`;
