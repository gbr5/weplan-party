import React, { useRef, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import IEventTransactionDTO from '../../../dtos/IEventTransactionDTO';

import formatOnlyDateShort from '../../../utils/formatOnlyDateShort';
import Backdrop from '../../Backdrop';

import {
  Container,
  CloseButton,
  Input,
  InputContainer,
  SearchButton,
} from './styles';

interface IProps {
  eventTransactions: IEventTransactionDTO[];
  handleEventTransactions: (data: IEventTransactionDTO[]) => void;
}

export function SearchTransactions({
  eventTransactions,
  handleEventTransactions,
}: IProps): JSX.Element {
  const iconSize = 28;
  const inputRef = useRef<HTMLInputElement>(null);

  const [backdrop, setBackdrop] = useState(false);
  const [filterString, setFilterString] = useState<string | undefined>(
    undefined,
  );

  function handleResetSearch(): void {
    setFilterString(undefined);
    if (inputRef.current) inputRef.current.value = '';
    setBackdrop(false);
    handleEventTransactions(eventTransactions);
  }

  function handleOffSearch(): void {
    setBackdrop(false);
  }

  function handleLookForTransaction(data: string): void {
    console.log(data);
    setFilterString(data);
    if (data === '') return handleEventTransactions(eventTransactions);
    setBackdrop(true);
    const findTransactions = eventTransactions.filter(({ transaction }) => {
      return (
        transaction.name.toLowerCase().includes(data.toLowerCase()) ||
        String(transaction.amount).toLowerCase().includes(data.toLowerCase()) ||
        formatOnlyDateShort(String(transaction.due_date)).includes(data) ||
        formatOnlyDateShort(String(transaction.created_at)).includes(data)
      );
    });
    console.log(findTransactions);
    return handleEventTransactions(findTransactions);
  }

  return (
    <>
      {backdrop && <Backdrop onClick={handleOffSearch} />}
      <Container
        style={{
          zIndex: backdrop ? 3 : 1,
        }}
      >
        <InputContainer>
          {filterString !== undefined && (
            <CloseButton onClick={handleResetSearch}>
              <FiX size={iconSize} color="red" />
            </CloseButton>
          )}
          <Input
            ref={inputRef}
            placeholder="Filtrar por ..."
            onChange={e => handleLookForTransaction(e.currentTarget.value)}
          />
          <SearchButton>
            <FiSearch size={24} />
          </SearchButton>
        </InputContainer>
      </Container>
    </>
  );
}
