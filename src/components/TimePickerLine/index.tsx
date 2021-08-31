/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

interface IProps {
  selectedDate: Date;
  handleSelectedDate: (date: Date) => void;
  title?: string;
}

export function DatePickerLine({
  handleSelectedDate,
  selectedDate,
  title,
}: IProps): JSX.Element {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        label={title ?? ''}
        format="dd/MM/yyyy"
        value={new Date(selectedDate)}
        onChange={date => handleSelectedDate(date ?? new Date(selectedDate))}
      />
    </MuiPickersUtilsProvider>
  );
}
