import React, {
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FiX, FiSearch } from 'react-icons/fi';

import Backdrop from '../../Backdrop';
import IUserDTO from '../../../dtos/IUserDTO';
import { useFriends } from '../../../hooks/friends';

import {
  Container,
  CloseButton,
  Input,
  InputContainer,
  SearchButton,
} from './styles';

interface IProps {
  handleUsers: (data: IUserDTO[]) => void;
}

export function SearchUsers({ handleUsers }: IProps): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);

  const { getUsersByUserName } = useFriends();

  const [backdrop, setBackdrop] = useState(false);
  const [filterString, setFilterString] = useState<string | undefined>(
    undefined,
  );

  function handleResetSearch(): void {
    setFilterString(undefined);
    // inputRef.current && inputRef.current.clear();
    // Keyboard.dismiss();
    setBackdrop(false);
    handleUsers([]);
  }

  function handleOffSearch(): void {
    // Keyboard.dismiss();
    setBackdrop(false);
  }

  const handleLookForTransaction = useCallback(
    async (data: string) => {
      setFilterString(data);
      if (data === '') return handleUsers([]);
      setBackdrop(true);
      const users = await getUsersByUserName(data);
      const findUsers = users.filter(user => {
        return user.name.toLowerCase().includes(data.toLowerCase());
      });
      handleUsers(findUsers);
      return '';
    },
    [handleUsers, getUsersByUserName],
  );

  const isActive = useMemo(() => {
    return !!(filterString && filterString !== '');
  }, [filterString]);

  return (
    <>
      {backdrop && <Backdrop onClick={handleOffSearch} />}
      <Container>
        <InputContainer isActive={isActive}>
          {filterString !== undefined && (
            <CloseButton onClick={handleResetSearch}>
              <FiX color="red" size={24} />
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
