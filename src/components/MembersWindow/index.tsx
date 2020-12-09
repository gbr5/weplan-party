import React, { MouseEventHandler } from 'react';

import IEventMemberDTO from '../../dtos/IEventMemberDTO';
import WindowContainer from '../WindowContainer';

import { Container, MembersContainer } from './styles';

import avatar_placeholder from '../../assets/avatar_placeholder.jpg';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  members: IEventMemberDTO[];
  handleMemberProfileWindow: Function;
}

const MembersWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  members,
  handleMemberProfileWindow,
}: IProps) => {
  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 10,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Container>
        <MembersContainer>
          {members.map(eventMember => (
            <button
              key={eventMember.id}
              type="button"
              onClick={() => handleMemberProfileWindow(eventMember)}
            >
              <img
                src={
                  eventMember.userEventMember.avatar_url === ''
                    ? avatar_placeholder
                    : eventMember.userEventMember.avatar_url
                }
                alt={eventMember.userEventMember.name}
              />

              <h1>{eventMember.userEventMember.name}</h1>
            </button>
          ))}
        </MembersContainer>
      </Container>
    </WindowContainer>
  );
};

export default MembersWindow;
