import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import ITaskFollowerDTO from '../../../../dtos/ITaskFollowerDTO';
import { useEventTasks } from '../../../../hooks/eventTasks';
import { useEventVariables } from '../../../../hooks/eventVariables';

import { Container, Name } from './styles';

interface IProps {
  user: ITaskFollowerDTO;
}

export function EventTaskFollower({ user }: IProps): JSX.Element {
  const { handleDeleteTaskFollowerConfirmation } = useEventTasks();
  const { selectEventTaskFollower } = useEventVariables();

  function deleteFollower(): void {
    selectEventTaskFollower(user);
    handleDeleteTaskFollowerConfirmation();
  }

  return (
    <Container onClick={deleteFollower}>
      <Name>{user.follower.name}</Name>
      <FiTrash2 size={24} color="red" />
    </Container>
  );
}
