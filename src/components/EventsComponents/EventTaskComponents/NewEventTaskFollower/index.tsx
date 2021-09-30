import React from 'react';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';
import IUserFollowerDTO from '../../../../dtos/IUserFollowerDTO';

import { Container, Name } from './styles';

interface IProps {
  user: IUserFollowerDTO;
  handleSelectFollower: (follower: IUserFollowerDTO) => void;
  isSelected: boolean;
}

export function NewEventTaskFollower({
  handleSelectFollower,
  isSelected,
  user,
}: IProps): JSX.Element {
  return (
    <Container onClick={() => handleSelectFollower(user)}>
      <Name>{user.follower.name}</Name>
      {isSelected ? <FiCheckSquare size={24} /> : <FiSquare size={24} />}
    </Container>
  );
}
