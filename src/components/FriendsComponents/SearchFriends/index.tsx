import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  ReactElement,
} from 'react';

import { FiX, FiSearch } from 'react-icons/fi';

import { useFriends } from '../../../hooks/friends';
import IFriendDTO from '../../../dtos/IFriendDTO';

import Backdrop from '../../Backdrop';

import {
  Container,
  CloseButton,
  Input,
  InputContainer,
  SearchButton,
} from './styles';
import { useCurrentEvent } from '../../../hooks/currentEvent';

interface IProps {
  handleFriends: (data: IFriendDTO[]) => void;
}

export function SearchFriends({ handleFriends }: IProps): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);

  const { filterEventFriends } = useCurrentEvent();

  const [backdrop, setBackdrop] = useState(false);
  const [filterString, setFilterString] = useState<string | undefined>(
    undefined,
  );

  function handleResetSearch(): void {
    setFilterString(undefined);
    // limpar o valor dentro de input e, se em mobile, esconder o teclado
    if (inputRef.current) inputRef.current.value = '';
    // Keyboard.dismiss();
    setBackdrop(false);
    const sortedFriends = filterEventFriends();
    handleFriends(sortedFriends);
  }

  function handleOffSearch(): void {
    // se estiver em mobile, esconder o teclado
    setBackdrop(false);
  }

  const handleLookForTransaction = useCallback(
    (data: string) => {
      const friends = filterEventFriends();
      setFilterString(data);
      if (data === '') return handleFriends(friends);
      setBackdrop(true);
      const finrFriends = friends.filter(({ friend }) => {
        return friend.name.toLowerCase().includes(data.toLowerCase());
      });
      return handleFriends(finrFriends);
    },
    [handleFriends, filterEventFriends],
  );

  const isActive = useMemo(() => {
    return !!(filterString && filterString !== '');
  }, [filterString]);

  return (
    <>
      {backdrop && <Backdrop onClick={handleOffSearch} />}
      <Container
        style={{
          zIndex: backdrop ? 3 : 1,
        }}
      >
        <InputContainer isActive={isActive}>
          {filterString !== undefined && (
            <CloseButton onClick={handleResetSearch}>
              <FiX size={24} color="red" />
            </CloseButton>
          )}
          <Input
            ref={inputRef}
            placeholder="Filtrar por ..."
            onChange={e => handleLookForTransaction(e.target.value)}
          />
          <SearchButton>
            <FiSearch size={24} />
          </SearchButton>
        </InputContainer>
      </Container>
    </>
  );
}
