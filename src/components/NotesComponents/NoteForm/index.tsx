import React, { useState, useRef, ReactElement, useMemo } from 'react';
import formatTextArea from '../../../utils/formatTextArea';

import {
  Container,
  TextAreaContainer,
  TextAreaInput,
  NumberOfCharacters,
  SendButton,
  SendButtonText,
} from './styles';

interface IProps {
  placeholder: string;
  handleNote: (e: string) => void;
}

export function NoteForm({ placeholder, handleNote }: IProps): ReactElement {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textValue, setTextValue] = useState('');
  const [rows, setRows] = useState(2);

  function submitNote(): void {
    handleNote(textValue);
    setTextValue('');
    // textAreaRef.current?.clear();
  }

  function handleChange(): void {
    const textArea = textAreaRef.current;
    if (textArea) {
      const numberOfRows = formatTextArea({ textArea });

      setRows(numberOfRows);
    }
  }

  const cols = useMemo(() => {
    const screenWidth = window.screen.width;
    return screenWidth * 0.08;
  }, []);

  return (
    <>
      <Container>
        <TextAreaContainer>
          <TextAreaInput
            ref={textAreaRef}
            placeholder={placeholder}
            autoCapitalize="sentences"
            name="note"
            onChange={handleChange}
            cols={cols}
            rows={rows}
          />
          <NumberOfCharacters>{textValue.length}</NumberOfCharacters>
        </TextAreaContainer>
        {textValue !== '' && (
          <SendButton onClick={submitNote}>
            <SendButtonText>Enviar</SendButtonText>
          </SendButton>
        )}
      </Container>
    </>
  );
}
