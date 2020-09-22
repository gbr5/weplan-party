import styled, { css, keyframes } from 'styled-components';
import '../../styles/global';
import { shade } from 'polished';
import Tooltip from '../../components/Tooltip';

const appearFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-150px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const appearFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

// const disappearFromBottom = keyframes`
//   from {
//     opacity: 1;
//     transform: translateY(0px);
//   }
//   /* 40% {
//     opacity: 0.5;
//     transform: translateY(-100px);
//   }
//   80% {
//     opacity: 0.9;
//     transform: translateY(-50px);
//   } */
//   to {
//     opacity: 0;
//     transform: translateY(-100px);
//   }
// `;

export const Container = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  animation: ${appearFromTop} 0.8s;
`;

export const EventPageContent = styled.main`
  position: relative;
  width: 100%;
  display: flex;
  padding: 0 80px;
  gap: 80px;
  animation: ${appearFromTop} 0.8s;

  > button {
    z-index: 8;
    background: transparent;
    border: none;
    border-radius: 8px;
    position: fixed;
    top: 100px;
    left: -8px;
    transition: 0.8s;

    color: var(--primary-color);

    &:hover {
      color: var(--letter-color-4);
    }
  }

  > span {
    > button {
      z-index: 8;
      background: transparent;
      border: none;
      border-radius: 8px;
      position: fixed;
      top: 100px;
      left: 22%;
      transition: 0.8s;

      color: var(--letter-color-4);
      animation: ${appearFromLeft} 0.8s;

      &:hover {
        color: var(--primary-color);
      }
    }
  }
`;

export const SideBar = styled.div`
  z-index: 5;
  position: fixed;
  top: 0px;
  left: 0;
  border-radius: 0 8px 8px 0;
  margin: 32px 0 0 0;
  background: var(--header-background-color);
  width: 22%;
  min-width: 220px;
  height: 100%;
  padding: 86px 16px 11px;
  display: flex;
  flex-direction: column;

  animation: ${appearFromLeft} 0.8s;

  > button {
    width: 100%;
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 16px;
    color: var(--letter-color-2);
    border: none;
    background: transparent;
    display: flex;
    align-items: flex-start;
    justify-content: left;
    position: relative;
    gap: 16px;

    > h5 {
      font-size: 22px;
      color: var(--title-color);
      display: flex;
      justify-content: center;
      align-items: unset;
      margin-top: 16px;
      margin-bottom: 16px;

      > svg {
        color: var(--title-color);
        opacity: 0.3;
      }
    }

    > h1 {
      left: 0;
      font-size: 20px;
      color: var(--primary-color);
      margin: 8px 0 4px;
      opacity: 0.9;
    }

    svg {
      position: absolute;
      color: var(--primary-color);
      right: 0;
      margin: 6px 0 4px;
    }

    &:hover {
      opacity: 0.8;

      > h5 {
        > svg {
          opacity: 1;
        }
      }
    }
  }
  span {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 16px;
    margin-bottom: 8px;

    > button {
      margin-top: 8px;
      margin-bottom: 8px;
      font-size: 16px;
      border: none;
      background: transparent;
      display: flex;
      align-items: flex-start;
      justify-content: center;

      &:hover {
        opacity: 0.8;
      }
      h2 {
        font-size: 18px;
        color: var(--letter-color-3);
      }

      h3 {
        font-size: 18px;
        color: var(--letter-color-2);
      }
    }

    p {
      margin-right: auto;
      margin-top: 8px;
      margin-top: 4px;
      font-size: 16px;
      color: var(--letter-color-2);
    }
  }
`;

export const MyEvents = styled.button`
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  color: var(--primary-color);
  margin-bottom: 24px;

  img {
    width: 176px;
    height: 176px;
    border-radius: 50%;
  }
`;

export const MyEventsDrawer = styled.div`
  top: 40px;
  z-index: 10;
  left: 0px;
  position: absolute;
  height: 300px;
  width: 500px;
  background-color: var(--card-color);
  border-radius: 0 0 8px 8px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px;
  overflow-y: scroll;

  > button {
    background-color: rgba(255, 144, 0, 0.05);
    display: flex;
    justify-content: center;
    color: var(--letter-color-3);
    margin: 8px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 16px;
    position: relative;

    > span {
      > svg {
        top: 13px;
        margin: auto;
      }
    }

    &:hover {
      background-color: rgba(255, 144, 0, 0.15);
    }
    svg {
      margin-left: auto;
    }
  }
`;

export const MyEventsDrawerButton = styled.button`
  background: transparent;
  border: none;
  color: var(--primary-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;

  > h1 {
    font-size: 24px;
    color: var(--primary-color);

    &:hover {
      opacity: 0.6;
    }
  }

  > span {
    > svg {
      top: 0;
      margin: auto;
    }
  }
`;

export const EventInfoDrawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  > h1 {
    font-size: 24px;
    color: var(--primary-color);
    height: 40px;
    width: 100%;
  }

  > h2 {
    font-size: 26px;
    color: var(--title-color);
  }

  button {
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 100%;
    border-radius: 4px;
  }
`;

export const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 60%;
  position: relative;
  margin: 0 auto;
  gap: 32px;

  > span {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    width: 100%;

    > div {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      gap: 16px;
      width: 100%;

      > div {
        text-align: start;
        height: 40px;

        > p {
          margin-right: auto;
          width: 250px;
          font-size: 20px;
          color: var(--letter-color-3);
        }

        > h3 {
          width: 100%;
          font-size: 22px;
          color: var(--primary-color);
        }
      }
    }
  }

  > div {
    height: 40px;
    width: 100%;
    text-align: start;

    > p {
      margin-right: auto;
      width: 250px;
      font-size: 20px;
      color: var(--letter-color-3);
    }

    > h3 {
      width: 100%;
      font-size: 22px;
      color: var(--primary-color);
    }
  }
`;

export const EditEventInfoDrawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    > div {
      display: flex;
      flex-direction: column;
      gap: 16px;
      > input {
        height: 40px;
        width: 100%;
        border-radius: 4px;
        padding: 0 16px;
        border: none;
      }
    }
  }

  button {
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 91.5%;
    border-radius: 4px;
  }
`;

export const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 150px;
  margin-bottom: 32px;
  position: relative;

  > button {
    z-index: 8;
    position: fixed;
    top: 90px;
    left: 47.7%;
    background: transparent;
    border: none;
    transition: 0.4s;

    > svg {
      color: var(--primary-color);
      transition: 1s;

      &:hover {
        color: var(--letter-color-4);
      }
    }
  }

  > span {
    > button {
      z-index: 8;
      position: absolute;
      top: 105px;
      left: 47.5%;
      background: transparent;
      border: none;
      transition: 0.4s;
      animation: ${appearFromTop} 0.8s;

      > svg {
        color: var(--letter-color-4);
        transition: 1s;

        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }
`;

export const EditEventNameDrawer = styled.div`
  border-radius: 0 0 8px 8px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px;

  > span {
    background-color: rgba(255, 144, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--letter-color-3);
    margin: 8px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 16px;

    h2 {
      font-size: 16px;
      color: var(--title-color);
      margin-bottom: 8px;
    }

    input {
      border: 1px solid var(--primary-color);
      border-radius: 4px;
      width: 300px;
      height: 32px;
    }

    button {
      margin-left: auto;
      margin-top: 16px;
      background: transparent;
      padding: 8px;
      border-radius: 8px;
      border: none;

      > h3 {
        color: var(--title-color);
        font-size: 16px;
      }

      &:hover {
        border: 1px solid var(--title-color);
      }
    }

    &:hover {
      background-color: rgba(255, 144, 0, 0.15);
    }
  }
`;

export const EditEventNameCloseButton = styled.button`
  position: absolute;
  top: 115px;
  right: 391px;
  background: transparent;
  border: none;

  > svg {
    color: red;
  }
`;

export const FirstRow = styled.div`
  position: absolute;
  top: -100px;
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  gap: 80px;
  margin: 100px auto 0px;

  animation: ${appearFromTop} 0.8s;

  div {
    display: flex;
    width: 130px;
    height: 130px;
    border: 3px solid var(--primary-color);
    background: var(--header-background-color);
    border-radius: 50%;
    align-items: center;
    justify-content: center;

    &:hover {
      opacity: 0.7;
    }

    button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;

      &:hover {
        opacity: 0.8;
      }

      h2 {
        font-size: 16px;
        color: var(--title-color);
        margin-bottom: 8px;
      }

      p {
        font-size: 16px;
        color: var(--letter-color-3);
      }
    }
  }
`;

export const BudgetDrawer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px;
  width: 100%;

  > span {
    background-color: rgba(255, 144, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--letter-color-3);
    margin: 8px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 16px;

    h2 {
      font-size: 16px;
      color: var(--title-color);
      margin-bottom: 8px;
    }

    input {
      border: 1px solid var(--primary-color);
      border-radius: 4px;
      height: 32px;
    }

    button {
      margin-left: auto;
      margin-top: 16px;
      background: transparent;
      padding: 8px;
      border-radius: 8px;
      border: none;

      > h3 {
        color: var(--title-color);
        font-size: 16px;
      }

      &:hover {
        border: 1px solid var(--title-color);
      }
    }

    &:hover {
      background-color: rgba(255, 144, 0, 0.15);
    }
  }
`;

export const AddSupplierDrawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > input {
    height: 40px;
    width: 90%;
    border-radius: 4px;
    padding: 0 16px;
    border: none;
  }

  button {
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 90%;
    border-radius: 4px;
  }
`;

export const BooleanSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  animation: ${appearFromTop} 0.8s;

  > h1 {
    margin: 0 auto;
    color: var(--primary-color);
  }

  > h3 {
    font-size: 24px;
    color: var(--title-color);
    margin: 0 auto;
  }

  > span {
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
    gap: 32px;
    border-bottom: 1px solid var(--primary-color);

    > span {
      position: absolute;
      top: 54px;
      right: 24px;

      > button {
        font-size: 32px;
        background: transparent;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;

        > svg {
          color: var(--primary-color);
          border-radius: 50%;
          transition: 0.4s;

          &:hover {
            color: var(--title-color);
            /* opacity: 0.8; */
            background: rgba(255, 150, 10, 0.3);
            box-shadow: 0px 0px 6px 6px rgba(255, 150, 10, 0.3);
          }
        }
      }
    }
  }

  > div {
    width: 100%;
    height: 400px;

    max-height: 500px;
    padding: 16px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    background: var(--card-color);
    border-radius: 8px;
    overflow-y: scroll;
  }
`;

interface ButtonProps {
  booleanActiveButton: boolean;
}

export const BooleanNavigationButton = styled.button<ButtonProps>`
  font-size: 32px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  opacity: 0.65;
  transition: 0.4s;

  &:hover {
    opacity: 1;
  }
  > svg {
    color: var(--primary-color);
  }

  ${props =>
    props.booleanActiveButton &&
    css`
      color: var(--letter-color-4);
      opacity: 1;
      transition: 0.4s;
    `}
`;

export const Guest = styled.div`
  width: 100%;
  height: 56px;
  margin: 0 auto;
  padding: 8px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--header-background-color);
  border-radius: 4px;
  transition: 0.3s;

  &:last-child {
    margin-bottom: 16px;
  }

  &:hover {
    box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);

    p {
      color: var(--title-color);
    }
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    > p {
      color: var(--primary-color);
      font-size: 16px;
      margin-left: 8px;
    }

    > button {
      background: transparent;
      border: none;
      font-size: 16px;
      color: var(--title-color);
      margin-right: auto;
      transition: 0.3s;

      &:hover {
        opacity: 0.8;
        color: var(--primary-color);

        svg {
          opacity: 1;
          color: var(--title-color);
        }
      }

      > strong {
        font-weight: 500;
      }

      > svg {
        opacity: 0.3;
        color: var(--title-color);
        transition: 0.3s;
        margin-left: 16px;
      }
    }
  }

  > button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-color);
    margin: 0 auto;
    transition: 0.3s;
    border-radius: 4px;

    &:hover {
      opacity: 0.8;
      box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
    }
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    transition: 0.3s;
    border-radius: 4px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      color: var(--title-color);
      transition: 0.4s;

      &:hover {
        opacity: 0.8;
        color: var(--primary-color);
      }
    }
  }
`;

export const AddGuestDrawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  transition: 0.4s;
  width: 100%;

  > h1 {
    font-size: 32px;
    margin-bottom: 32px;
    color: var(--title-color);
  }

  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    width: 100%;
    margin-bottom: 16px;

    > button {
      height: 40px;
      width: 100%;
      border-radius: 4px;
      padding: 0 16px;
      border: none;
      transition: 0.3s;

      &:hover {
        opacity: 0.8;
        box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
      }
    }

    > h1 {
      > button {
        background: transparent;
        border: none;
        color: var(--primary-color);
        font-size: 24px;
        font-weight: 500;
        transition: 0.3s;

        &:hover {
          opacity: 0.8;
          box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
        }
      }
    }
  }

  button {
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 90%;
    border-radius: 4px;
    margin-bottom: 16px;
    transition: 0.3s;

    &:hover {
      opacity: 0.8;
      box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
    }
  }
`;

export const CheckList = styled.section`
  height: 500px;
  background: var(--card-color);
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 1px 1px 5px 4px rgba(90, 90, 90, 0.02);
  position: relative;
  overflow-y: scroll;
  animation: ${appearFromTop} 0.8s;

  > button {
    right: 16px;
    top: 16px;
    position: absolute;
    background: transparent;
    border: none;
    color: var(--title-color);
  }

  > strong {
    color: var(--letter-color-2);
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid var(--letter-color-4);
    display: block;
    margin-bottom: 16px;
    padding-bottom: 16px;
  }

  li {
    list-style: none;
    padding: 0 8px 16px;
    display: flex;
    grid-template-columns: 4fr 16fr 1fr;
    align-items: center;
    border-bottom: 1px solid var(--letter-color-4);
    color: var(--title-color);

    > span {
      margin: 0 auto;
    }

    button {
      background: transparent;
      border: none;
      color: var(--primary-color);

      > span {
        margin-right: auto;
      }
    }
  }

  li + li {
    margin-top: 16px;
  }
`;

export const AddCheckListDrawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  width: 100%;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > input {
    height: 40px;
    width: 90%;
    border-radius: 4px;
    padding: 0 16px;
    border: none;
  }

  button {
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 90%;
    border-radius: 4px;
  }
`;

export const Financial = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  box-sizing: border-box;
  animation: ${appearFromTop} 0.8s;

  img {
    width: 100%;
    border-radius: 8px;
  }
`;

export const LatestNews = styled.div`
  background: var(--header-background-color);
  margin-top: 32px;
  padding: 24px;
  border-radius: 8px;
  height: 300px;
  width: 100%;
  box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);
  flex: 1;
  align-items: center;
  animation: ${appearFromTop} 0.8s;

  > strong {
    color: var(--letter-color-2);
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid var(--letter-color-4);
    display: block;
    margin-bottom: 12px;
    padding-bottom: 16px;
  }

  li {
    list-style: none;
    padding: 0 8px 12px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--letter-color-4);

    h3 {
      color: var(--title-color);
    }

    span {
      margin-left: 4px;
      color: var(--primary-color);
    }
    p {
      margin-right: auto;
      margin-left: 16px;
    }
  }

  li + li {
    margin-top: 16px;
  }
`;

export const Payments = styled.section`
  background: var(--header-background-color);
  width: 100%;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 1px 1px 5px 4px rgba(90, 90, 90, 0.02);

  > strong {
    color: var(--letter-color-2);
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid var(--letter-color-4);
    display: block;
    margin-bottom: 16px;
    padding-bottom: 16px;
  }

  li {
    list-style: none;
    padding: 0 8px 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--letter-color-4);

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    span {
      margin-right: auto;
    }
  }

  li + li {
    margin-top: 16px;
  }
`;

export const MessagesSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1px;
  animation: ${appearFromTop} 0.8s;
`;

export const UsersChat = styled.div`
  display: grid;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  position: relative;

  > div {
    padding: 16px;
    border-radius: 8px;
    background-color: var(--header-background-color);
    box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    > h1 {
      width: 100%;
      margin-top: 3px;
      font-size: 24px;
      color: var(--primary-color);
      border-bottom: 1px solid var(--letter-color-2);
      padding-bottom: 8px;
    }
  }
`;

export const UserChat = styled.div`
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--letter-color-4);

  > h1 {
    font-size: 18px;
    color: var(--title-color);
  }

  > svg {
    margin-left: auto;
  }
`;

export const ChatMessages = styled.div`
  width: 100%;
  display: grid;
  align-items: flex-start;
  gap: 16px;
  position: relative;

  > div {
    width: 100%;

    padding: 16px;
    border-radius: 8px;
    background-color: var(--header-background-color);
    box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    > span {
      width: 100%;

      > button {
        margin-right: auto;
        background: transparent;
        border: none;

        > h1 {
          width: 100%;
          font-size: 24px;
          color: var(--primary-color);
          border-bottom: 1px solid var(--letter-color-2);
          padding-bottom: 8px;
        }
      }
    }

    button {
      width: 100%;
      height: 40px;
      background-color: var(--primary-color);
      opacity: 0.9;
      border: none;
      border-radius: 4px;
    }

    input {
      border: none;
      height: 40px;
      width: 100%;
      border-radius: 4px;
      background-color: var(--letter-color-4);
      color: var(--letter-color-2);
    }
  }
`;

export const Messages = styled.div`
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--letter-color-4);

  > p {
    font-size: 16px;
    color: var(--letter-color-1);
    margin-right: 16px;
  }
  > p + p {
    margin-left: auto;
  }
  > span {
    margin-right: 16px;
    color: var(--letter-color-3);
  }
`;

export const WeplanUserDrawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  width: 100%;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > div {
    display: flex;
    width: 100%;
    gap: 16px;

    button {
      background: var(--primary-color);
      border: none;
      height: 40px;
      width: 100%;
      font-weight: 500;
      border-radius: 4px;

      &:hover {
        opacity: 0.8;
        box-shadow: 2px 2px 5px 3px rgba(255, 150, 10, 0.3);
      }
    }
  }
`;

export const GuestConfirmedDrawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  width: 100%;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > div {
    display: flex;
    width: 100%;
    gap: 16px;

    button {
      background: var(--primary-color);
      border: none;
      height: 40px;
      font-weight: 500;
      width: 100%;
      border-radius: 4px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 100%;
  height: 30%;
  animation: ${appearFromTop} 1s;

  .DayPicker {
    background: var(--background-color);
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker {
    width: 100%;
  }

  .DayPicker-Month {
    width: 90%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: var(--letter-color-4);
    border-radius: 10px;
    color: var(--letter-color-1);
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: var(--primary-color) !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;

export const CheckedListItemDrawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > div {
    display: flex;
    gap: 16px;
    width: 100%;

    button {
      background: var(--primary-color);
      border: none;
      height: 40px;
      width: 90%;
      border-radius: 4px;
    }
  }
`;

export const IsHiredDrawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > div {
    display: flex;
    gap: 16px;
    width: 100%;

    button {
      background: var(--primary-color);
      border: none;
      height: 40px;
      width: 90%;
      border-radius: 4px;
    }
  }
`;

export const AddPlannerDrawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
    margin-bottom: 32px;
  }

  button {
    margin-top: 24px;
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 91.5%;
    border-radius: 4px;
  }
`;

export const AddOwnerDrawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
    margin-bottom: 32px;
  }

  button {
    margin-top: 24px;
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 91.5%;
    border-radius: 4px;
  }
`;

export const AddMemberDrawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
    margin-bottom: 32px;
  }

  button {
    margin-top: 24px;
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 91.5%;
    border-radius: 4px;
  }
`;

export const MembersWindow = styled.div`
  display: grid;
  grid-template-rows: 1fr 5fr;
  gap: 16px;
  width: 100%;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    > h1 {
      position: absolute;
      top: 24px;
      left: 24px;
      font-size: 24px;
      color: var(--title-color);
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin: 0 auto;

      h1 {
        font-size: 32px;
        color: var(--primary-color);
      }

      strong {
        font-size: 32px;
        color: var(--title-color);
      }
    }
  }
`;

export const MembersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 32px;
  width: 100%;
  gap: 32px;
  overflow-y: scroll;

  button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 8px;
    background: var(--letter-color-3);
    height: 100px;
    padding: 32px auto;
    gap: 16px;
    box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.2);
    transition: 0.6s;

    > img {
      margin-left: 14px;
      height: 80px;
      width: 80px;
      border-radius: 50%;
      box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.2);
      transition: 0.6s;

      &:hover {
        box-shadow: 5px 5px 6px 2px rgba(255, 150, 10, 0.4);
      }
    }

    > h1 {
      font-size: 24px;
      color: var(--letter-color-5);
    }

    &:hover {
      box-shadow: 4px 4px 6px 2px rgba(255, 150, 10, 0.3);
      opacity: 0.8;
    }
  }
`;

export const NotHostGuest = styled(Tooltip)`
  font-size: 16px;
  color: var(--title-color);
  margin: auto auto auto 0;
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
    color: var(--primary-color);
  }

  > strong {
    font-weight: 500;
  }

  svg {
    margin: 0;
  }

  span {
    background: var(--red-color);
    color: var(--letter-color-1);
    text-align: center;

    &::before {
      border-color: var(--red-color) transparent;
    }
  }
`;

export const NumberOfGuestWindow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  width: 100%;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  button {
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 100%;
    font-weight: 500;
    border-radius: 4px;

    &:hover {
      opacity: 0.8;
      box-shadow: 2px 2px 5px 3px rgba(255, 150, 10, 0.3);
    }
  }
`;
