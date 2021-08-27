import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  margin-top: 40px;
  width: 100%;
`;

export const Option = styled.button`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 1% 0 3%;
`;

export const Text = styled.p`
  font-size: 20px;
  color: var(--letter-color-6);
  font-weight: bold;
`;

export const CancelOption = styled.button`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 1% 0 3%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid var(--red-color);
`;

export const CancelText = styled.p`
  font-size: 20px;
  color: var(--letter-color-6);
  font-weight: bold;
`;

export const Body = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DateContainer = styled.div``;

export const DateTitle = styled.p`
  font-size: 20px;
  color: var(--letter-color-6);
  font-weight: bold;
  margin: 0 0 5%;
`;
