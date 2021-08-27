import React from 'react';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

interface IProps {
  selectedDate: Date;
  handleSelectedDate: (date: Date) => void;
}

export function DatePickerLine({
  handleSelectedDate,
  selectedDate,
}: IProps): JSX.Element {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        label="Selecione a data"
        format="dd/MM/yyyy"
        value={new Date(selectedDate)}
        onChange={date => handleSelectedDate(date ?? new Date(selectedDate))}
      />
    </MuiPickersUtilsProvider>
  );
}
