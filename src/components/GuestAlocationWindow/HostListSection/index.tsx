import React from 'react';

import IHostDTO from '../../../dtos/IHostDTO';
import HostRow from '../HostRow';

import { Container } from './styles';

interface IProps {
  availableNumberOfGuests: number;
  masterId: string;
  getHosts: Function;
  handleUpdateEventNumberOfGuests: Function;
  hosts: IHostDTO[];
}

const HostListSection: React.FC<IProps> = ({
  availableNumberOfGuests,
  masterId,
  getHosts,
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
            getHosts={getHosts}
            handleUpdateEventNumberOfGuests={handleUpdateEventNumberOfGuests}
            host={host}
            masterId={masterId}
          />
        );
      })}
    </Container>
  );
};

export default HostListSection;
