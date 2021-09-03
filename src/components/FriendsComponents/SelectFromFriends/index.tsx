import React, { ReactElement, useState } from 'react';

import { useFriends } from '../../../hooks/friends';

import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';
import { WindowHeader } from '../../WindowHeader';
import { SearchFriends } from '../SearchFriends';
import { SelectFriendButton } from '../SelectFriendButton';
import IFriendDTO from '../../../dtos/IFriendDTO';
import Button from '../../Button';

import { Container, FriendsContainer } from './styles';

interface IProps {
  handleAddFriends: (data: IFriendDTO[]) => Promise<void>;
  closeWindow: () => void;
}

export function SelectFromFriends({
  handleAddFriends,
  closeWindow,
}: IProps): ReactElement {
  const { friends, selectedFriends, handleSelectedFriends } = useFriends();

  const [filteredFriends, setFilteredFriends] = useState<IFriendDTO[]>(friends);

  function handleFilteredFriends(data: IFriendDTO[]): void {
    setFilteredFriends(data);
  }

  async function handleSelectFriends(): Promise<void> {
    await handleAddFriends(selectedFriends);
    closeWindow();
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 15,
        top: '5%',
        left: '0%',
        height: '90%',
        width: '100%',
      }}
      zIndex={14}
    >
      <Container>
        <WindowHeader overTitle="Selecionar" title="Amigos" />
        <SearchFriends handleFriends={handleFilteredFriends} />
        {filteredFriends.length > 0 && (
          <FriendsContainer>
            {filteredFriends.map(item => (
              <SelectFriendButton friend={item} />
            ))}
          </FriendsContainer>
        )}
        {selectedFriends.length > 0 && (
          <Button onClick={handleSelectFriends}>Avançar</Button>
        )}
      </Container>
    </WindowUnFormattedContainer>
  );
}
