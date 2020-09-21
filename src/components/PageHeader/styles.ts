import { shade } from 'polished';
import styled from 'styled-components';
import '../../styles/global';

export const Header = styled.header`
  position: fixed;
  top: 0;
  z-index: 5;

  width: 100%;
  padding: 16px 0;

  background: var(--header-background-color);
  box-shadow: var(--box-shadow);
`;

export const HeaderContent = styled.div`
  max-width: 95%;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > h1 {
    margin-right: 32px;

    > button {
      background: transparent;
      border: none;
      color: var(--letter-color-1);
    }

    &:hover {
      opacity: 0.8;
    }
  }

  > button {
    background: transparent;
    border: none;
  }

  > span {
    margin-left: 120px;

    > button {
      border: none;
      background: transparent;
      display: flex;
      align-items: flex-start;
      justify-content: left;
      position: relative;
      gap: 16px;

      > h5 {
        font-size: 28px;
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

      &:hover {
        opacity: 0.8;

        > h5 {
          > svg {
            opacity: 1;
          }
        }
      }
    }
  }
`;

export const Logo = styled.h2`
  color: var(--primary-color);
  font-size: 32px;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;

  a {
    text-decoration: none;
    color: var(--primary-color);
    transition: 0.2s;

    > img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.1);
    }
  }

  a:hover {
    opacity: 0.7;
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;

  button {
    background: transparent;
    border: 0;
    margin-left: 32px;
    font-size: 18px;
    font-weight: 500;
    color: var(--letter-color-1);

    svg {
      color: var(--letter-color-1);
      width: 30px;
      height: 30px;
    }
  }
`;

export const Appointments = styled.div`
  z-index: 1000;
  position: fixed;
  top: 20%;
  left: 15%;
  width: 70%;
  height: 60%;
  display: flex;
  background: var(--background-color);
  padding: 32px;

  > button {
    background: transparent;
    border: none;
    position: absolute;
    top: 0;
    right: 8px;

    svg {
      color: red;
    }
  }
`;

export const MyAppointments = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  position: relative;

  > button {
    right: 0;
    position: absolute;
    background: transparent;
    border: none;
    color: var(--title-color);
  }

  > h1 {
    font-size: 24px;
    color: var(--primary-color);
  }

  > div {
    width: 100%;
    height: 400px;
    overflow-y: scroll;

    padding: 16px;
    border-radius: 8px;
    background-color: var(--header-background-color);
    box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);

    display: flex;
    flex-direction: column;
    gap: 16px;

    > button + button {
      border-top: 1px solid var(--letter-color-3);
    }
  }
`;

export const Appointment = styled.button`
  background: transparent;
  border: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px 4px 4px 4px;

  > div {
    display: flex;
    justify-content: center;
    align-items: unset;
    margin-bottom: 8px;
    width: 100%;

    > h1 {
      text-align: start;
      margin-right: auto;
      font-size: 18px;
      color: var(--title-color);
    }

    > span {
      margin-left: auto;

      font-size: 16px;
      color: var(--letter-color-1);
    }

    > h2 {
      margin-left: auto;
      font-size: 18px;
      color: var(--primary-color);
    }

    > p {
      margin-right: auto;
      font-size: 16px;
      color: var(--letter-color-2);
    }
  }
`;

export const AddAppointmentDrawer = styled.div`
  position: fixed;
  z-index: 10;
  top: 5%;
  left: 2%;
  width: 96%;
  height: 85%;
  display: flex;
  flex-direction: column;
  /* grid-template-columns: 2fr 1fr; */
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  box-shadow: 2px 2px 15px 8px rgba(255, 150, 10, 0.3);
  padding: 32px;

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

  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    gap: 32px;

    > span {
      margin: auto 0;
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 16px;

      > div {
        display: flex;

        > button {
          height: 40px;
          width: 90%;
          border-radius: 4px;
          padding: 0 16px;
          border: none;
          margin: 16px;
        }
      }
    }

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

export const EditAppointmentDrawer = styled.div`
  position: fixed;
  z-index: 10;
  top: 5%;
  left: 2%;
  width: 96%;
  height: 85%;
  display: flex;
  flex-direction: column;
  /* grid-template-columns: 2fr 1fr; */
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

    > span {
      margin: auto 0;
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 16px;

      > div {
        display: flex;

        > button {
          height: 40px;
          width: 90%;
          border-radius: 4px;
          padding: 0 16px;
          border: none;
          margin: 16px;
        }
      }
    }

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

  > span {
    display: flex;
    align-items: stretch;
    justify-content: center;

    > button {
      margin-top: 16px;
      background: var(--primary-color);
      border: none;
      height: 40px;
      width: 100%;
      border-radius: 4px;
    }

    > div {
      > button {
        margin-top: 16px;
        background: var(--red-color);
        border: none;
        height: 40px;
        width: 100%;
        border-radius: 4px;
      }
    }
  }
`;

export const AppointmentTypeDrawer = styled.div`
  position: absolute;
  z-index: 100;
  top: 30%;
  left: 30%;
  width: 40%;
  height: 40%;
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
    display: flex;
    gap: 16px;

    button {
      background: var(--primary-color);
      border: none;
      height: 40px;
      width: 90%;
      border-radius: 4px;
    }
  }
`;

export const WeplanSupplierAppointmentDrawer = styled.div`
  position: absolute;
  z-index: 100;
  top: 30%;
  left: 0;
  width: 200px;
  height: 300px;
  display: flex;
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
    display: flex;
    gap: 16px;

    button {
      background: var(--primary-color);
      border: none;
      height: 40px;
      width: 90%;
      border-radius: 4px;
    }
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
