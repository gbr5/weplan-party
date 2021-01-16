import React from 'react';
import dateToFormattedDate from '../../../../../utils/dateToFormattedDate';

import { Container } from './styles';

interface IEventDateDTO {
  id: string;
  date: Date;
}

interface IProps {
  dates: IEventDateDTO[];
}

const PossibleDates: React.FC<IProps> = ({ dates }: IProps) => {
  return (
    <Container>
      {dates.map(date => (
        <strong key={date.id}>{dateToFormattedDate(String(date.date))}</strong>
      ))}
    </Container>
  );
};

export default PossibleDates;
