import styled from 'styled-components';
import '../../styles/global';
import { shade } from 'polished';

export const Button = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;

  background: var(--primary-color);
  box-shadow: var(--box-shadow);
  transition: 0.25s;

  &:hover {
    opacity: 0.8;
    box-shadow: 1px 1px 10px 1px var(--title-color);
  }
`;

export const ButtonContent = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EventTypeDrawer = styled.div`
  position: fixed;
  bottom: 163px;
  z-index: 50000;
  left: 280px;
  width: 248px;
  height: 350px;
  background: var(--card-color);
  border-radius: 4px 4px 20px 20px;

  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.h2`
  color: var(--letter-color-5);
  font-size: 24px;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  button {
    background: var(--primary-color);
    height: 40px;
    border-radius: 8px;
    width: 200px;
    border: 0;
    font-size: 18px;
    font-weight: 500;
    color: var(--letter-color-5);

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const CreateEventForm = styled.div`
  position: fixed;
  z-index: 10;
  top: 5%;
  left: 10%;
  width: 80%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    gap: 32px;

    > div {
      margin: auto 0;
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 16px;

      > h1 {
        font-size: 24px;
        color: var(--title-color);
        margin-bottom: 40px;
      }

      > button {
        height: 40px;
        width: 90%;
        border-radius: 4px;
        padding: 0 16px;
        border: none;
        margin: 16px;
      }

      span {
        position: absolute;
        top: 4px;
        right: 4px;
        > button {
          background: transparent;
          border: none;

          svg {
            color: red;
          }
        }
      }
      /*
      > input {
        height: 40px;
        width: 90%;
        border-radius: 4px;
        padding: 0 16px;
        border: none;
        margin: 16px;
      } */

      > p {
        margin-top: 32px;
        font-size: 20px;
        color: var(--primary-color);
      }

      div {
        display: flex;
        gap: 16px;
        margin-right: 16px;

        > input {
          height: 40px;
          width: 90%;
          border-radius: 4px;
          padding: 0 16px;
          border: none;
          margin: 16px;
        }
      }
    }
  }

  > button {
    margin-top: 16px;
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 100%;
    border-radius: 4px;
  }
`;

export const CreateAppointmentForm = styled.div`
  position: fixed;
  z-index: 10;
  top: 2%;
  left: 10%;
  width: 80%;
  height: 96%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;

  > h1 {
    font-size: 24px;
    color: var(--title-color);
  }

  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    gap: 16px;

    > div {
      margin: auto 0;
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 16px;

      > h1 {
        font-size: 24px;
        color: var(--title-color);
        margin-bottom: 40px;
      }

      span {
        position: absolute;
        top: 4px;
        right: 4px;
        > button {
          background: transparent;
          border: none;

          svg {
            color: red;
          }
        }
      }

      > input {
        height: 40px;
        width: 90%;
        border-radius: 4px;
        padding: 0 16px;
        border: none;
        margin: 16px;
      }
      > input {
        margin: 0 16px 16px 16px;
      }
      > p {
        margin-top: 24px;
        font-size: 20px;
        color: var(--primary-color);
      }

      div {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-right: 16px;

        > p {
          width: 100%;
          margin-top: 24px;
          font-size: 20px;
          color: var(--primary-color);
        }

        > input {
          height: 40px;
          width: 90%;
          border-radius: 4px;
          padding: 0 16px;
          border: none;
          margin: 16px 16px 0 16px;
        }
      }
    }
  }

  > button {
    margin-top: 16px;
    background: var(--primary-color);
    border: none;
    height: 40px;
    width: 100%;
    border-radius: 4px;
  }
`;

export const Calendar = styled.aside`
  width: 100%;
  height: 30%;

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

export const EventInfoDrawer = styled.div`
  position: fixed;
  z-index: 10;
  top: 110px;
  left: 400px;
  width: 600px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background: var(--header-background-color);
  border-radius: 8px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;
  gap: 16px;

  span {
    position: absolute;
    top: 0;
    right: 8px;
    > button {
      background: transparent;
      border: none;

      svg {
        color: red;
      }
    }
  }

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
