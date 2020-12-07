import styled, { css, keyframes } from 'styled-components';
import '../../styles/global';
import { shade } from 'polished';

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
    transform: translateX(-300px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const Container = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  animation: ${appearFromTop} 0.5s;
`;

export const EventPageContent = styled.main`
  position: relative;
  width: 100%;
  display: flex;
  padding: 0 80px;
  gap: 80px;
  animation: ${appearFromTop} 0.5s;

  > button {
    z-index: 5;
    background: transparent;
    border: none;
    border-radius: 8px;
    position: fixed;
    top: 100px;
    left: -8px;
    transition: 0.25s;

    color: var(--primary-color);

    &:hover {
      color: var(--letter-color-4);
    }
  }

  > span {
    > button {
      z-index: 5;
      background: transparent;
      border: none;
      border-radius: 8px;
      position: fixed;
      top: 100px;
      left: 22%;
      transition: 0.25s;

      color: var(--letter-color-4);
      animation: ${appearFromLeft} 0.5s;

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

  animation: ${appearFromLeft} 0.5s;

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
  background-color: var(--header-background-color);
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
  }

  > span {
    > svg {
      top: 0;
      margin: auto;
    }
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
    z-index: 5;
    position: fixed;
    top: 90px;
    left: 47.7%;
    background: transparent;
    border: none;
    transition: 0.25s;

    > svg {
      color: var(--primary-color);
      transition: 0.25s;

      &:hover {
        color: var(--letter-color-4);
      }
    }
  }

  > span {
    > button {
      z-index: 5;
      position: absolute;
      top: 105px;
      left: 47.5%;
      background: transparent;
      border: none;
      transition: 0.25s;
      animation: ${appearFromTop} 0.5s;

      > svg {
        color: var(--letter-color-4);
        transition: 0.25s;

        &:hover {
          color: var(--primary-color);
        }
      }
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

  animation: ${appearFromTop} 0.5s;

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
  transition: 0.5s;
  border-radius: 0;

  &:hover {
    color: var(--text-color);
    opacity: 1;
    border-radius: 15px;
    background: var(--header-background-color-hover);
  }
  > svg {
    color: var(--primary-color);
  }

  ${props =>
    props.booleanActiveButton &&
    css`
      color: var(--text-color);
      opacity: 1;
      transition: 0.25s;

      &:hover {
        opacity: 0.8;
        background: var(--background-color);
      }
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
  background: var(--background-color);
  border-radius: 4px;
  transition: 0.25s;

  &:last-child {
    margin-bottom: 16px;
  }

  &:hover {
    box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
    background: var(--card-color);

    p {
      color: var(--title-color);
    }
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;

    > p {
      color: var(--text-color);
      font-size: 16px;
      margin-left: 8px;
    }

    > button {
      background: transparent;
      border: none;
      font-size: 16px;
      color: var(--text-color);
      margin: 0 24px;
      transition: 0.25s;
      width: 100%;
      display: flex;

      &:hover {
        opacity: 0.8;
        color: var(--title-color);

        svg {
          opacity: 1;
          color: var(--title-color);
        }
      }

      > strong {
        font-weight: 500;
        margin-right: auto;
      }

      > svg {
        opacity: 0.3;
        color: var(--text-color);
        transition: 0.25s;
        margin-left: auto;
      }
    }
  }

  > button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);
    margin: 0 auto;
    transition: 0.25s;
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
    transition: 0.25s;
    border-radius: 4px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      color: var(--text-color);
      transition: 0.25s;

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
  transition: 0.25s;
  width: 100%;

  > h1 {
    font-size: 32px;
    color: var(--title-color);
  }

  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    width: 100%;

    > button {
      height: 40px;
      width: 100%;
      border-radius: 4px;
      padding: 0 16px;
      border: none;
      transition: 0.25s;

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
        transition: 0.25s;

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
    width: 100%;
    border-radius: 4px;
    margin-bottom: 16px;
    transition: 0.25s;

    &:hover {
      opacity: 0.8;
      box-shadow: 1px 1px 3px 2px rgba(255, 150, 10, 0.3);
    }
  }
`;

export const FlagButton = styled.button<ButtonProps>`
  font-size: 32px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
  border-radius: 0;

  &:hover {
    color: var(--text-color);
    opacity: 1;
    border-radius: 15px;
    background: var(--header-background-color-hover);
  }
  > svg {
    color: var(--primary-color);
  }

  ${props =>
    props.booleanActiveButton &&
    css`
      color: var(--text-color);
      opacity: 1;
      transition: 0.25s;
      box-shadow: var(--window-box-shadow);
      border: 1px solid var(--primary-color);

      &:hover {
        opacity: 0.8;
        background: var(--background-color);
      }
    `}
`;

export const Financial = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  box-sizing: border-box;
  animation: ${appearFromTop} 0.5s;

  img {
    width: 100%;
    border-radius: 8px;
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

export const FormWindow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
  position: relative;
  box-sizing: border-box;

  > h1 {
    font-size: 28px;
    color: var(--title-color);
    margin-bottom: 8px;
  }

  > h2 {
    font-size: 24px;
    color: var(--primary-color);
    margin-bottom: 8px;
  }

  > button {
    margin-top: 12px;
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 100%;
    border-radius: 4px;
  }

  > div {
    display: flex;
    width: 100%;
    gap: 24px;

    > button {
      margin-top: 12px;
      background: var(--primary-color);
      border: none;
      height: 40px;
      width: 100%;
      border-radius: 4px;
    }
  }

  > span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    width: 100%;
    border-top: 1px solid var(--letter-color-4);
    padding: 16px;

    > p {
      font-size: 24px;
      color: var(--title-color);
    }
  }
`;

export const MiniForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 100%;

  > button {
    background: var(--green-icon);
    border: none;
    height: 60px;
    width: 150px;
    border-radius: 4px;
  }

  > span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    width: 90%;
    gap: 8px;

    > p {
      font-size: 16px;
      color: var(--title-color);
    }

    > div {
      display: flex;
      gap: 8px;
      width: 100%;

      > button {
        background: var(--primary-color);
        border: none;
        height: 40px;
        width: 100%;
        border-radius: 4px;
      }
    }
  }
`;
