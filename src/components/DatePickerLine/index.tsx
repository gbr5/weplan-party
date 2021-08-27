import React from 'react';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

interface IProps {
  selectedDate: Date;
  handleSelectedDate: (date: Date) => void;
}

export function TimePickerLine({
  handleSelectedDate,
  selectedDate,
}: IProps): JSX.Element {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TimePicker
        label="Selecione o horário"
        value={new Date(selectedDate)}
        onChange={date => handleSelectedDate(date ?? new Date(selectedDate))}
      />
    </MuiPickersUtilsProvider>
  );
}
