import React, { ReactElement, useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useEventTasks } from '../../../../hooks/eventTasks';
import { useEventVariables } from '../../../../hooks/eventVariables';

import formatOnlyDate from '../../../../utils/formatOnlyDate';
import formatOnlyTime from '../../../../utils/formatOnlyTime';

import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';
import { SelectTaskPriorityComponent } from '../SelectTaskPriorityComponent';
import { WindowHeader } from '../../../WindowHeader';

import {
  Container,
  FormQuestion,
  DateContainer,
  DateText,
  DateButton,
  TimeText,
} from './styles';
import Button from '../../../Button';
import Input from '../../../Input';
import { useToast } from '../../../../hooks/toast';

interface IFormData {
  title: string;
}

export function NewTaskForm(): ReactElement {
  const { addToast } = useToast();
  const { selectedEvent } = useEventVariables();
  const {
    createTask,
    loading,
    taskDate,
    handleSelectTaskDateWindow,
    handleSelectTaskTimeWindow,
    handleCreateTaskWindow,
  } = useEventTasks();
  const formRef = useRef<FormHandles>(null);

  const [selectedPriority, setPriority] = useState<'low' | 'neutral' | 'high'>(
    'low',
  );

  const handleSubmit = useCallback(
    async ({ title }: IFormData) => {
      try {
        if (title === '')
          return addToast({
            title: 'Dê um nome à tarefa!',
            type: 'error',
          });
        await createTask({
          event_id: selectedEvent.id,
          title,
          due_date: taskDate,
          priority: selectedPriority,
          status: 'not started',
        });
        handleCreateTaskWindow();
        return addToast({
          title: 'Tarefa criada com sucesso!',
          type: 'success',
        });
      } catch {
        addToast({
          type: 'error',
          title: 'Erro ao criar a tarefa, tente novamente.',
        });
        throw new Error();
      }
    },
    [
      handleCreateTaskWindow,
      addToast,
      createTask,
      selectedEvent,
      taskDate,
      selectedPriority,
    ],
  );

  function selectTaskPriority(data: 'low' | 'neutral' | 'high'): void {
    setPriority(data);
  }

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={handleCreateTaskWindow}
      containerStyle={{
        top: '5%',
        left: '2%',
        height: '85%',
        width: '96%',
        zIndex: 15,
      }}
    >
      <WindowHeader title="Nova Tarefa" />
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormQuestion>Título</FormQuestion>
          <Input
            name="title"
            autoCapitalize="words"
            placeholder="Defina o título da tarefa"
          />
        </Form>
        <SelectTaskPriorityComponent
          handleTaskPriority={(data: 'low' | 'neutral' | 'high') =>
            selectTaskPriority(data)
          }
          selectedPriority={selectedPriority}
        />
        <FormQuestion>Data prevista</FormQuestion>
        <DateContainer>
          <DateButton onClick={handleSelectTaskDateWindow}>
            <DateText>{formatOnlyDate(String(taskDate))}</DateText>
          </DateButton>
          <DateButton onClick={handleSelectTaskTimeWindow}>
            <TimeText>{formatOnlyTime(String(taskDate))}</TimeText>
          </DateButton>
        </DateContainer>
      </Container>
      <Button loading={loading} onClick={() => formRef.current?.submitForm()}>
        Salvar
      </Button>
    </WindowUnFormattedContainer>
  );
}
