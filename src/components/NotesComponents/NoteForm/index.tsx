/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React, { useState, useRef, ReactElement, useMemo } from 'react';
import { useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import formatTextArea from '../../../utils/formatTextArea';

import {
  Container,
  TextAreaContainer,
  TextAreaInput,
  NumberOfCharacters,
  SendButton,
} from './styles';

interface IProps {
  placeholder: string;
  defaulValue?: string;
  handleNote: (e: string) => void;
}

export function NoteForm({
  placeholder,
  handleNote,
  defaulValue,
}: IProps): ReactElement {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textValue, setTextValue] = useState('');
  const [rows, setRows] = useState(2);

  function submitNote(): void {
    if (textAreaRef.current) {
      if (textAreaRef.current.value === '') return;
      handleNote(textValue);
      setTextValue('');
      textAreaRef.current.value = '';
    }
  }

  function handleChange(): void {
    const textArea = textAreaRef.current;
    if (textArea) {
      const numberOfRows = formatTextArea({ textArea });
      setTextValue(textArea.value);
      setRows(numberOfRows);
    }
  }

  const cols = useMemo(() => {
    const screenWidth = window.screen.width;
    return screenWidth * 0.08;
  }, []);

  useEffect(() => {
    if (textValue === '' && textAreaRef.current && defaulValue) {
      textAreaRef.current.value = defaulValue;
      setTextValue(defaulValue);
    }
  }, [defaulValue, textAreaRef, textValue]);

  return (
    <>
      <Container>
        <TextAreaContainer>
          <TextAreaInput
            ref={textAreaRef}
            placeholder={placeholder}
            defaultValue={defaulValue}
            autoCapitalize="sentences"
            name="note"
            onChange={handleChange}
            cols={cols}
            rows={rows}
          />
          <NumberOfCharacters>{textValue.length}</NumberOfCharacters>
        </TextAreaContainer>
        <SendButton onClick={submitNote}>
          <FiSend />
        </SendButton>
      </Container>
    </>
  );
}
