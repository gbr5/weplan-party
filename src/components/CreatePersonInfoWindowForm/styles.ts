import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--header-background-color);
  border-radius: 8px;
  padding: 32px;

  > form {
    display: flex;
    width: 100%;
    height: 100%;
    gap: 32px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      gap: 24px;
    }
  }
`;

export const QuestionTitle = styled.h2`
  color: var(--title-color);
  font-size: 32px;
  margin: 32px auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  > strong {
    font-size: 40px;
    color: var(--primary-color);
  }
`;
