import React, { ReactElement, useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { addDays } from 'date-fns/esm';
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
import { TimePickerLine } from '../../../DatePickerLine';
import formatOnlyDateShort from '../../../../utils/formatOnlyDateShort';
import { DatePickerLine } from '../../../TimePickerLine';

interface IFormData {
  title: string;
}

export function NewTaskForm(): ReactElement {
  const { addToast } = useToast();
  const { selectedEvent, selectedEventTask } = useEventVariables();
  const {
    createTask,
    loading,
    handleSelectTaskTimeWindow,
    handleCreateTaskWindow,
  } = useEventTasks();
  const formRef = useRef<FormHandles>(null);

  const [selectedPriority, setPriority] = useState<'low' | 'neutral' | 'high'>(
    'low',
  );

  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 3));

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
          due_date: selectedDate,
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
      selectedDate,
      selectedPriority,
    ],
  );

  function selectTaskPriority(data: 'low' | 'neutral' | 'high'): void {
    setPriority(data);
  }

  async function handleUpdateTaskDueDate(date: Date): Promise<void> {
    if (
      formatOnlyDateShort(String(date)) ===
      formatOnlyDateShort(String(setSelectedDate))
    )
      return;
    setSelectedDate(date);
  }

  async function handleUpdateTaskDueTime(date: Date): Promise<void> {
    if (
      formatOnlyTime(String(date)) ===
      formatOnlyTime(String(selectedEventTask.due_date))
    )
      return;
    setSelectedDate(date);
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
      zIndex={14}
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
          <SelectTaskPriorityComponent
            handleTaskPriority={(data: 'low' | 'neutral' | 'high') =>
              selectTaskPriority(data)
            }
            selectedPriority={selectedPriority}
          />
          <FormQuestion>Data prevista</FormQuestion>
          <DateContainer>
            <TimePickerLine
              handleSelectedDate={handleUpdateTaskDueTime}
              selectedDate={selectedDate}
            />
            <DatePickerLine
              handleSelectedDate={handleUpdateTaskDueDate}
              selectedDate={selectedDate}
            />
          </DateContainer>
          <Button loading={loading} type="submit">
            Salvar
          </Button>
        </Form>
      </Container>
    </WindowUnFormattedContainer>
  );
}
