import React from 'react';

import IHostDTO from '../../../dtos/IHostDTO';
import HostRow from '../HostRow';

import { Container } from './styles';

interface IProps {
  availableNumberOfGuests: number;
  handleUpdateEventNumberOfGuests: Function;
  hosts: IHostDTO[];
}

const HostListSection: React.FC<IProps> = ({
  availableNumberOfGuests,
  handleUpdateEventNumberOfGuests,
  hosts,
}: IProps) => {
  return (
    <Container>
      {hosts.map(host => {
        return (
          <HostRow
            key={host.id}
            availableNumberOfGuests={availableNumberOfGuests}
            handleUpdateEventNumberOfGuests={handleUpdateEventNumberOfGuests}
            host={host}
          />
        );
      })}
    </Container>
  );
};

export default HostListSection;
