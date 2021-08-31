import React, { useCallback, useState } from 'react';

import { getDaysInMonth } from 'date-fns';

import SelectMonth from './SelectMonth';
import SelectYear from './SelectYear';
import SelectWeekDay from './SelectWeekDay';
import SelectEventDates from './SelectEventDates';

import WindowUnFormattedContainer from '../WindowUnFormattedContainer';

interface IProps {
  selectDates: Function;
  closeWindow: Function;
  alreadySelectedDates: Date[];
}

const SelectMultipleDates: React.FC<IProps> = ({
  selectDates,
  closeWindow,
  alreadySelectedDates,
}: IProps) => {
  const [selectYearWindow, setSelectYearWindow] = useState(true);
  const [selectMonthWindow, setSelectMonthWindow] = useState(false);
  const [selectWeekdayWindow, setSelectWeekdayWindow] = useState(false);
  const [selectPossibleDatesWindow, setSelectPossibleDatesWindow] = useState(
    false,
  );
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);
  const [dateArray, setDateArray] = useState<Date[]>([]);

  const closeAllWindows = useCallback(() => {
    setSelectYearWindow(false);
    setSelectMonthWindow(false);
    setSelectWeekdayWindow(false);
    setSelectPossibleDatesWindow(false);
  }, []);

  const handleSelectedYears = useCallback(
    (props: string) => {
      const findYear = selectedYears.find(year => year === props);
      let years = selectedYears;

      if (!findYear) {
        years.push(props);
      } else {
        years = selectedYears.filter(year => year !== props);
      }
      setSelectedYears(years);
    },
    [selectedYears],
  );

  const handleSelectedMonths = useCallback(
    (props: string) => {
      const findMonth = selectedMonths.find(month => month === props);
      let months = selectedMonths;

      if (!findMonth) {
        months.push(props);
      } else {
        months = selectedMonths.filter(month => month !== props);
      }
      setSelectedMonths(months);
    },
    [selectedMonths],
  );

  const handleSelectedWeekDays = useCallback(
    (props: string) => {
      const findDay = selectedWeekdays.find(day => day === props);
      let days = selectedWeekdays;

      if (!findDay) {
        days.push(props);
      } else {
        days = selectedWeekdays.filter(day => day !== props);
      }
      setSelectedWeekdays(days);
    },
    [selectedWeekdays],
  );

  const handleDateArray = useCallback(() => {
    const transformedDates: Date[] = [];

    selectedYears.map(year => {
      selectedMonths.map(month => {
        const allDatesFromMonth: Date[] = [];
        const numberOfDaysInMonth = getDaysInMonth(Number(month));
        for (let i = 1; i < numberOfDaysInMonth; i += 1) {
          const thisDate = new Date(`${month}/${i}/${year}`);
          allDatesFromMonth.push(thisDate);
        }
        selectedWeekdays.map(weekDay => {
          let thisDay = weekDay;
          if (weekDay === '7') {
            thisDay = '0';
          }
          const xDates = allDatesFromMonth.filter(
            date => date.getDay() === Number(thisDay),
          );
          xDates.map(date => {
            const findAlreadySelectedDate = alreadySelectedDates.find(
              selectedDate => selectedDate === date,
            );
            !findAlreadySelectedDate && transformedDates.push(date);
            return '';
          });
          return '';
        });
        return '';
      });
      return '';
    });
    setDateArray(transformedDates);
    setSelectPossibleDatesWindow(true);
  }, [selectedYears, selectedMonths, selectedWeekdays, alreadySelectedDates]);

  const handleNavigateToWindow = useCallback(
    (props: string) => {
      props === 'PossibleDates' && handleDateArray();
      closeAllWindows();
      props === 'Year' && setSelectYearWindow(true);
      props === 'Month' && setSelectMonthWindow(true);
      props === 'Weekday' && setSelectWeekdayWindow(true);
      props === 'PossibleDates' && setSelectPossibleDatesWindow(true);
    },
    [closeAllWindows, handleDateArray],
  );

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 15,
        top: '0%',
        left: '0%',
        height: '100%',
        width: '100%',
      }}
      zIndex={14}
    >
      {selectYearWindow && (
        <SelectYear
          changeWindow={(e: string) => handleNavigateToWindow(e)}
          closeWindow={closeWindow}
          selectYear={(e: string) => handleSelectedYears(e)}
        />
      )}
      {selectMonthWindow && (
        <SelectMonth
          changeWindow={(e: string) => handleNavigateToWindow(e)}
          closeWindow={closeWindow}
          selectMonth={(e: string) => handleSelectedMonths(e)}
        />
      )}
      {selectWeekdayWindow && (
        <SelectWeekDay
          changeWindow={(e: string) => handleNavigateToWindow(e)}
          closeWindow={closeWindow}
          selectWeekDay={(e: string) => handleSelectedWeekDays(e)}
        />
      )}
      {selectPossibleDatesWindow && (
        <SelectEventDates
          alreadySelectedDates={alreadySelectedDates}
          changeWindow={(e: string) => handleNavigateToWindow(e)}
          closeWindow={closeWindow}
          selectEventDates={(e: Date) => selectDates(e)}
          selectedPossibleEventDates={dateArray}
        />
      )}
    </WindowUnFormattedContainer>
  );
};

export default SelectMultipleDates;
