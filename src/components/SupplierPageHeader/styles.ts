import { shade } from 'polished';
import styled from 'styled-components';
import '../../styles/global';

export const Header = styled.header`
  position: fixed;
  top: 0;
  z-index: 8;

  width: 100%;
  padding: 16px 0 0;

  background: var(--background-color);
  /* box-shadow: var(--box-shadow); */
`;

export const HeaderContent = styled.div`
  max-width: 95%;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > h1 {
    margin-right: 20px;

    > button {
      background: transparent;
      border: none;
      color: var(--letter-color-1);
    }
  }

  > h2 {
    margin: auto;
    font-size: 20px;
    color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;

    &:hover {
      opacity: 0.8;

      > button {
        > svg {
          color: var(--title-color);
        }
      }
    }

    > button {
      background: transparent;
      border: none;
      color: var(--letter-color-1);

      > svg {
        transition: 0.3s;
      }
    }
  }

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background: transparent;
    border: none;

    > img {
      height: 24px;
    }

    > h1 {
      margin-right: 20px;
    }
  }

  > span {
    margin: 0 auto;

    > button {
      border: none;
      background: transparent;
      display: flex;
      align-items: flex-start;
      justify-content: left;
      position: relative;
      gap: 16px;

      > h5 {
        font-size: 20px;
        color: var(--title-color);
        display: flex;
        justify-content: center;
        align-items: unset;
        margin-top: 16px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;

        > svg {
          color: var(--title-color);
          opacity: 0.5;
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
  font-size: 24px;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;

  a {
    text-decoration: none;
    color: var(--primary-color);
    transition: 0.25s;

    > img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      box-shadow: var(--window-box-shadow);
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
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    /* border: 1px solid var(--primary-color); */
    box-shadow: var(--box-shadow);
    border-radius: 50%;

    svg {
      color: var(--primary-color);
      width: 24px;
      height: 24px;
      transition: 0.3s;
    }

    &:hover {
      border: 1px solid var(--title-color);
      border-radius: 4px;
      box-shadow: var(--window-box-shadow);

      svg {
        color: var(--title-color);
      }
    }
    /* &:nth-child(3) {
      svg {
        color: var(--letter-color-1);
        transition: 0.3s;
      }
      &:hover {
        border: 1px solid var(--letter-color-1);
        border-radius: 4px;
        box-shadow: var(--window-box-shadow);

        svg {
          color: var(--title-color);
        }
      }
    } */

    &:nth-child(4) {
      svg {
        color: var(--red-color);
        transition: 0.3s;
      }

      &:hover {
        border: 1px solid var(--red-color);
        border-radius: 4px;
        box-shadow: var(--window-box-shadow);

        svg {
          color: var(--title-color);
        }
      }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;

  > h1 {
    font-size: 32px;
    color: var(--title-color);
    margin-bottom: 24px;
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

      > button {
        height: 40px;
        width: 90%;
        border-radius: 4px;
        padding: 0 16px;
        border: none;
        margin: 16px;
      }

      > p {
        margin-top: 32px;
        font-size: 20px;
        color: var(--primary-color);
      }

      div {
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        width: 100%;

        > button {
          background: var(--primary-color);
          border: none;
          height: 40px;
          width: 100%;
          border-radius: 4px;
          padding: 0 16px;
        }

        > h1 {
          height: 40px;
          width: 100%;
          color: var(--primary-color);

          > button {
            background: transparent;
            border: none;
            border-radius: 4px;
            padding: 0 16px;
            color: var(--primary-color);
            font-weight: 500;
            font-size: 24px;
          }
        }
      }
    }
  }

  > button {
    background: var(--primary-color);
    border: none;
    margin-top: 16px;
    height: 40px;
    width: 100%;
    border-radius: 4px;
  }

  > span {
    display: flex;
    align-items: stretch;
    justify-content: center;
    height: 40px;
    width: 100%;
    gap: 32px;

    > button {
      margin-top: 16px;
      background: var(--primary-color);
      border: none;
      height: 40px;
      width: 100%;
      border-radius: 4px;
    }

    > div {
      height: 40px;
      width: 100%;

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

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

export const ToggleButton = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;
