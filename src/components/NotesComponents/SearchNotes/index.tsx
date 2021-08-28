import React, { ReactElement, useCallback, useRef, useState } from 'react';
import { FiX, FiSearch } from 'react-icons/fi';

import INoteDTO from '../../../dtos/INoteDTO';
import formatOnlyDateShort from '../../../utils/formatOnlyDateShort';

import Backdrop from '../../Backdrop';

import {
  CloseButton,
  Container,
  Input,
  InputContainer,
  SearchButton,
} from './styles';

interface IProps {
  notes: INoteDTO[];
  handleNotes: (data: INoteDTO[]) => void;
}

export function SearchNotes({ handleNotes, notes }: IProps): ReactElement {
  const iconSize = 24;
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [backdrop, setBackdrop] = useState(false);
  const [filterString, setFilterString] = useState<string | undefined>(
    undefined,
  );

  function handleResetSearch(): void {
    setFilterString('');
    if (inputRef.current) inputRef.current.value = '';
    // Keyboard.dismiss();
    setBackdrop(false);
    handleNotes(notes);
  }

  const handleLookForNote = useCallback(
    (data: string) => {
      setFilterString(data);
      if (data === '') return handleNotes(notes);
      setBackdrop(true);
      const findNotes = notes.filter(note => {
        return (
          note.note.toLowerCase().includes(data.toLowerCase()) ||
          formatOnlyDateShort(String(note.updated_at)).includes(data)
        );
      });
      return handleNotes(findNotes);
    },
    [handleNotes, notes],
  );

  function handleOffSearch(): void {
    // Keyboard.dismiss();
    setBackdrop(false);
  }

  // const isActive = useMemo(() => {
  //   return !!(filterString && filterString !== '');
  // }, [filterString]);

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
              <FiX size={iconSize} color="#ff3030" />
            </CloseButton>
          )}
          <Input
            ref={inputRef}
            placeholder="Filtrar por ..."
            onChange={e => handleLookForNote(e.target.value)}
          />
          <SearchButton>
            <FiSearch size={iconSize} />
          </SearchButton>
        </InputContainer>
      </Container>
    </>
  );
}
