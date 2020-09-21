import styled from 'styled-components';
import '../../styles/global';

export const MemberDrawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > img {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.2);
  }

  > h1 {
    font-size: 24px;
    color: var(--title-color);
    margin: 40px;
  }

  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 16px;
    width: 100%;
  }
`;

export const EditMemberButton = styled.button`
  background: var(--primary-color);
  border: none;
  height: 40px;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  font-weight: 500;
  color: var(--letter-color-5);

  > strong {
    font-weight: 600px;
    margin-right: 16px;
  }

  &:hover {
    opacity: 0.8;
    box-shadow: 0px 0px 3px 2px rgba(255, 150, 10, 0.3);

    > svg {
      opacity: 1;
      color: var(--green-icon);
    }
  }
  > svg {
    opacity: 0.8;
    color: var(--letter-color-5);
    transition: 0.3s;
  }
`;

export const DeleteMemberButton = styled.button`
  background: var(--letter-color-4);
  border: none;
  height: 40px;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  font-weight: 500;
  color: var(--title-color);

  &:hover {
    opacity: 0.8;
    box-shadow: 0px 0px 3px 2px rgba(255, 150, 10, 0.3);
    background: var(--red-color);

    > svg {
      opacity: 1;
      color: var(--title-color);
    }
  }
  > svg {
    opacity: 0.8;
    color: var(--red-icon);
    transition: 0.3s;
  }
`;
