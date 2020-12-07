import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useState, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdAdd, MdFlag } from 'react-icons/md';
import * as Yup from 'yup';
import ICreateCheckListTaskDTO from '../../dtos/ICreateCheckListTaskDTO';
import IEventCheckListDTO from '../../dtos/IEventCheckListDTO';
import IListEventDTO from '../../dtos/IListEventDTO';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import formatStringToDate from '../../utils/formatDateToString';
import getValidationErrors from '../../utils/getValidationErros';
import Input from '../Input';

import WindowContainer from '../WindowContainer';

import {
  Container,
  CheckListFunnel,
  AddCheckListDrawer,
  FlagButton,
} from './styles';

interface IProps {
  handleGetCheckListTasks: Function;
  closeAllWindows: Function;
  pageEvent: IListEventDTO;
  inProgressCheckListTasks: IEventCheckListDTO[];
  resolvedCheckListTasks: IEventCheckListDTO[];
  notStartedCheckListTasks: IEventCheckListDTO[];
}

const EventCheckListSection: React.FC<IProps> = ({
  handleGetCheckListTasks,
  closeAllWindows,
  pageEvent,
  inProgressCheckListTasks,
  resolvedCheckListTasks,
  notStartedCheckListTasks,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [priorityLevel, setPriorityLevel] = useState(0);
  const [addCheckListDrawer, setAddCheckListDrawer] = useState(false);
  const [
    editCheckListTaskPriorityLevelWindow,
    setEditCheckListTaskPriorityLevelWindow,
  ] = useState(false);

  const [checkListItem, setCheckListTask] = useState<IEventCheckListDTO>(
    {} as IEventCheckListDTO,
  );

  const [editCheckListTaskWindow, setEditCheckListTaskWindow] = useState(false);

  const handleEditCheckListTaskWindow = useCallback(
    (props: IEventCheckListDTO) => {
      setCheckListTask(props);
      setPriorityLevel(props.priority_level);
      setEditCheckListTaskWindow(true);
    },
    [],
  );
  const handleEditCheckListTaskPriorityLevelWindow = useCallback(
    (props: IEventCheckListDTO) => {
      setCheckListTask(props);
      setPriorityLevel(props.priority_level);
      setEditCheckListTaskPriorityLevelWindow(true);
    },
    [],
  );

  const handleAddCheckListDrawer = useCallback(() => {
    closeAllWindows();
    setAddCheckListDrawer(!addCheckListDrawer);
  }, [addCheckListDrawer, closeAllWindows]);

  const handleAddCheckListTask = useCallback(
    async (data: ICreateCheckListTaskDTO) => {
      try {
        formRef.current?.setErrors([]);
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          due_date: Yup.date(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        const date = new Date(data.due_date);

        await api.post(`events/${pageEvent.id}/check-list`, {
          name: data.name,
          priority_level: priorityLevel,
          status: 1,
          due_date: date,
        });
        addToast({
          type: 'success',
          title: 'Item criado com Sucesso',
          description: 'O item foi adicionado à sua check-list.',
        });
        handleAddCheckListDrawer();
        handleGetCheckListTasks();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }
        addToast({
          type: 'error',
          title: 'Erro ao criar item da check-list',
          description: 'Erro  ao criar o item, tente novamente.',
        });
      }
    },
    [
      addToast,
      pageEvent.id,
      handleAddCheckListDrawer,
      handleGetCheckListTasks,
      priorityLevel,
    ],
  );
  const handleEditCheckListTaskStatus1 = useCallback(
    async (props: string) => {
      try {
        await api.put(`events/check-list/${props}/status`, {
          status: 1,
        });

        addToast({
          type: 'success',
          title: 'Item editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });

        setEditCheckListTaskWindow(false);
        setCheckListTask({} as IEventCheckListDTO);
        handleGetCheckListTasks();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar item',
          description: 'Erro ao editar o item do check-list, tente novamente.',
        });
      }
    },
    [addToast, handleGetCheckListTasks],
  );
  const handleEditCheckListTaskStatus2 = useCallback(
    async (props: string) => {
      try {
        await api.put(`events/check-list/${props}/status`, {
          status: 2,
        });

        addToast({
          type: 'success',
          title: 'Item editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });

        setEditCheckListTaskWindow(false);
        setCheckListTask({} as IEventCheckListDTO);
        handleGetCheckListTasks();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar item',
          description: 'Erro ao editar o item do check-list, tente novamente.',
        });
      }
    },
    [addToast, handleGetCheckListTasks],
  );
  const handleEditCheckListTaskStatus3 = useCallback(
    async (props: string) => {
      try {
        await api.put(`events/check-list/${props}/status`, {
          status: 3,
        });

        addToast({
          type: 'success',
          title: 'Item editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });

        setEditCheckListTaskWindow(false);
        setCheckListTask({} as IEventCheckListDTO);
        handleGetCheckListTasks();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar item',
          description: 'Erro ao editar o item do check-list, tente novamente.',
        });
      }
    },
    [addToast, handleGetCheckListTasks],
  );
  const handleEditCheckListTask = useCallback(
    async (data: IEventCheckListDTO) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          name: Yup.string().required(),
          due_date: Yup.date(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const date = new Date(data.due_date);

        await api.put(`events/check-list/${checkListItem.id}`, {
          name: data.name,
          priority_level: priorityLevel,
          due_date: date,
        });

        addToast({
          type: 'success',
          title: 'Item editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });

        setEditCheckListTaskWindow(false);
        setPriorityLevel(0);
        setCheckListTask({} as IEventCheckListDTO);
        handleGetCheckListTasks();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar item',
          description: 'Erro ao editar o item do check-list, tente novamente.',
        });
      }
    },
    [addToast, checkListItem, handleGetCheckListTasks, priorityLevel],
  );
  const handleEditCheckListTaskPriorityLevel = useCallback(async () => {
    try {
      await api.put(`events/check-list/${checkListItem.id}/priority-level`, {
        priority_level: priorityLevel,
      });

      addToast({
        type: 'success',
        title: 'Item editado com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });

      setEditCheckListTaskPriorityLevelWindow(false);
      setPriorityLevel(0);
      setCheckListTask({} as IEventCheckListDTO);
      handleGetCheckListTasks();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
      }

      addToast({
        type: 'error',
        title: 'Erro ao editar item',
        description: 'Erro ao editar o item do check-list, tente novamente.',
      });
    }
  }, [addToast, checkListItem, handleGetCheckListTasks, priorityLevel]);
  const handleDeleteCheckListTask = useCallback(async () => {
    try {
      await api.delete(`events/check-list/${checkListItem.id}`);

      addToast({
        type: 'success',
        title: 'Item deletado com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });

      setEditCheckListTaskWindow(false);
      setCheckListTask({} as IEventCheckListDTO);
      handleGetCheckListTasks();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao deletar item',
        description: 'Erro ao deletar o item do check-list, tente novamente.',
      });

      throw new Error(err);
    }
  }, [addToast, checkListItem, handleGetCheckListTasks]);

  return (
    <>
      {!!addCheckListDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setAddCheckListDrawer(false)}
          containerStyle={{
            zIndex: 1000,
            top: '10%',
            left: '20%',
            height: '80%',
            width: '60%',
          }}
        >
          <Form ref={formRef} onSubmit={handleAddCheckListTask}>
            <AddCheckListDrawer>
              <h1>Adicionar Item</h1>
              <Input name="name" type="text" placeholder="Nome" />
              <Input name="due_date" type="date" />
              <span>
                <h2>Prioridade</h2>
                <div>
                  <FlagButton
                    booleanActiveButton={priorityLevel === 1}
                    type="button"
                    onClick={() => setPriorityLevel(1)}
                  >
                    <MdFlag size={40} color="green" />
                  </FlagButton>
                  <FlagButton
                    booleanActiveButton={priorityLevel === 2}
                    type="button"
                    onClick={() => setPriorityLevel(2)}
                  >
                    <MdFlag size={40} color="yellow" />
                  </FlagButton>
                  <FlagButton
                    booleanActiveButton={priorityLevel === 3}
                    type="button"
                    onClick={() => setPriorityLevel(3)}
                  >
                    <MdFlag size={40} color="red" />
                  </FlagButton>
                </div>
              </span>

              <div>
                <button type="submit">
                  <h3>Salvar</h3>
                </button>
              </div>
            </AddCheckListDrawer>
          </Form>
        </WindowContainer>
      )}
      {!!editCheckListTaskWindow && (
        <WindowContainer
          onHandleCloseWindow={() => setEditCheckListTaskWindow(false)}
          containerStyle={{
            zIndex: 1000,
            top: '10%',
            left: '20%',
            height: '80%',
            width: '60%',
          }}
        >
          <Form ref={formRef} onSubmit={handleEditCheckListTask}>
            <AddCheckListDrawer>
              <h1>Editar Item</h1>

              <Input
                name="name"
                type="text"
                defaultValue={checkListItem.name}
              />
              <p>
                Data limite:{' '}
                {formatStringToDate(String(checkListItem.due_date))}
              </p>
              <Input
                name="due_date"
                type="date"
                defaultValue={String(checkListItem.due_date)}
              />
              <span>
                <h2>Prioridade</h2>
                <div>
                  <FlagButton
                    booleanActiveButton={priorityLevel === 1}
                    type="button"
                    onClick={() => setPriorityLevel(1)}
                  >
                    <MdFlag size={40} color="green" />
                  </FlagButton>
                  <FlagButton
                    booleanActiveButton={priorityLevel === 2}
                    type="button"
                    onClick={() => setPriorityLevel(2)}
                  >
                    <MdFlag size={40} color="yellow" />
                  </FlagButton>
                  <FlagButton
                    booleanActiveButton={priorityLevel === 3}
                    type="button"
                    onClick={() => setPriorityLevel(3)}
                  >
                    <MdFlag size={40} color="red" />
                  </FlagButton>
                </div>
              </span>
              <div>
                <button type="submit">Salvar</button>
                <button type="button" onClick={handleDeleteCheckListTask}>
                  Deletar
                </button>
              </div>
            </AddCheckListDrawer>
          </Form>
        </WindowContainer>
      )}

      {!!editCheckListTaskPriorityLevelWindow && (
        <WindowContainer
          onHandleCloseWindow={() =>
            setEditCheckListTaskPriorityLevelWindow(false)
          }
          containerStyle={{
            zIndex: 1000,
            top: '35%',
            left: '20%',
            height: '30%',
            width: '60%',
          }}
        >
          <Form ref={formRef} onSubmit={handleEditCheckListTaskPriorityLevel}>
            <AddCheckListDrawer>
              <h1>Definir prioridade</h1>
              <span>
                <div>
                  <FlagButton
                    booleanActiveButton={priorityLevel === 1}
                    type="button"
                    onClick={() => setPriorityLevel(1)}
                  >
                    <MdFlag size={40} color="green" />
                  </FlagButton>
                  <FlagButton
                    booleanActiveButton={priorityLevel === 2}
                    type="button"
                    onClick={() => setPriorityLevel(2)}
                  >
                    <MdFlag size={40} color="yellow" />
                  </FlagButton>
                  <FlagButton
                    booleanActiveButton={priorityLevel === 3}
                    type="button"
                    onClick={() => setPriorityLevel(3)}
                  >
                    <MdFlag size={40} color="red" />
                  </FlagButton>
                </div>
              </span>
              <div>
                <button type="submit">Salvar</button>
              </div>
            </AddCheckListDrawer>
          </Form>
        </WindowContainer>
      )}
      <Container>
        <strong>Check List</strong>
        {pageEvent.isOwner && (
          <button type="button" onClick={handleAddCheckListDrawer}>
            <MdAdd size={40} />
          </button>
        )}
        <CheckListFunnel>
          <div>
            <h1>Não iniciada</h1>
            <ul>
              {notStartedCheckListTasks.map(item => (
                <li key={item.id}>
                  {pageEvent.isOwner ? (
                    <>
                      <p>
                        {notStartedCheckListTasks.findIndex(
                          itemIndex => itemIndex.id === item.id,
                        ) + 1}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleEditCheckListTaskWindow(item)}
                      >
                        <span>{item.name}</span>
                      </button>
                      <span>
                        <button
                          type="button"
                          onClick={() =>
                            handleEditCheckListTaskPriorityLevelWindow(item)
                          }
                        >
                          {Number(item.priority_level) === 3 && (
                            <MdFlag color="red" size={20} />
                          )}
                          {Number(item.priority_level) === 2 && (
                            <MdFlag color="yellow" size={20} />
                          )}
                          {Number(item.priority_level) === 1 && (
                            <MdFlag color="green" size={20} />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleEditCheckListTaskStatus2(item.id)
                          }
                        >
                          <FiChevronRight size={30} />
                        </button>
                      </span>
                    </>
                  ) : (
                    <>
                      <p>
                        {notStartedCheckListTasks.findIndex(
                          itemIndex => itemIndex.id === item.id,
                        ) + 1}
                      </p>
                      <button type="button">
                        <span>{item.name}</span>
                      </button>
                      <span>
                        <button type="button">
                          {Number(item.priority_level) === 3 && (
                            <MdFlag color="red" size={20} />
                          )}
                          {Number(item.priority_level) === 2 && (
                            <MdFlag color="yellow" size={20} />
                          )}
                          {Number(item.priority_level) === 1 && (
                            <MdFlag color="green" size={20} />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleEditCheckListTaskStatus2(item.id)
                          }
                        >
                          <FiChevronRight size={30} />
                        </button>
                      </span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1>Em progresso</h1>
            <ul>
              {inProgressCheckListTasks.map(item => (
                <li key={item.id}>
                  {pageEvent.isOwner ? (
                    <>
                      <p>
                        {inProgressCheckListTasks.findIndex(
                          itemIndex => itemIndex.id === item.id,
                        ) + 1}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleEditCheckListTaskWindow(item)}
                      >
                        <span>{item.name}</span>
                      </button>
                      <span>
                        <button
                          type="button"
                          onClick={() =>
                            handleEditCheckListTaskStatus1(item.id)
                          }
                        >
                          <FiChevronLeft size={30} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleEditCheckListTaskPriorityLevelWindow(item)
                          }
                        >
                          {Number(item.priority_level) === 3 && (
                            <MdFlag color="red" size={20} />
                          )}
                          {Number(item.priority_level) === 2 && (
                            <MdFlag color="yellow" size={20} />
                          )}
                          {Number(item.priority_level) === 1 && (
                            <MdFlag color="green" size={20} />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleEditCheckListTaskStatus3(item.id)
                          }
                        >
                          <FiChevronRight size={30} />
                        </button>
                      </span>
                    </>
                  ) : (
                    <>
                      <p>
                        {inProgressCheckListTasks.findIndex(
                          itemIndex => itemIndex.id === item.id,
                        ) + 1}
                      </p>
                      <button type="button">
                        <span>{item.name}</span>
                      </button>
                      <span>
                        <button
                          type="button"
                          onClick={() =>
                            handleEditCheckListTaskStatus1(item.id)
                          }
                        >
                          <FiChevronLeft size={30} />
                        </button>
                        <button type="button">
                          {Number(item.priority_level) === 3 && (
                            <MdFlag color="red" size={20} />
                          )}
                          {Number(item.priority_level) === 2 && (
                            <MdFlag color="yellow" size={20} />
                          )}
                          {Number(item.priority_level) === 1 && (
                            <MdFlag color="green" size={20} />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleEditCheckListTaskStatus3(item.id)
                          }
                        >
                          <FiChevronRight size={30} />
                        </button>
                      </span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1>Concluída</h1>
            <ul>
              {resolvedCheckListTasks.map(item => (
                <li key={item.id}>
                  {pageEvent.isOwner ? (
                    <>
                      <p>
                        {resolvedCheckListTasks.findIndex(
                          itemIndex => itemIndex.id === item.id,
                        ) + 1}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleEditCheckListTaskWindow(item)}
                      >
                        <span>{item.name}</span>
                      </button>
                      <span>
                        <button
                          type="button"
                          onClick={() =>
                            handleEditCheckListTaskStatus2(item.id)
                          }
                        >
                          <FiChevronLeft size={30} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleEditCheckListTaskPriorityLevelWindow(item)
                          }
                        >
                          {Number(item.priority_level) === 3 && (
                            <MdFlag color="red" size={20} />
                          )}
                          {Number(item.priority_level) === 2 && (
                            <MdFlag color="yellow" size={20} />
                          )}
                          {Number(item.priority_level) === 1 && (
                            <MdFlag color="green" size={20} />
                          )}
                        </button>
                      </span>
                    </>
                  ) : (
                    <>
                      <p>
                        {resolvedCheckListTasks.findIndex(
                          itemIndex => itemIndex.id === item.id,
                        ) + 1}
                      </p>
                      <button type="button">
                        <span>{item.name}</span>
                      </button>
                      <span>
                        <button
                          type="button"
                          onClick={() =>
                            handleEditCheckListTaskStatus2(item.id)
                          }
                        >
                          <FiChevronLeft size={30} />
                        </button>
                        <button type="button">
                          {Number(item.priority_level) === 3 && (
                            <MdFlag color="red" size={20} />
                          )}
                          {Number(item.priority_level) === 2 && (
                            <MdFlag color="yellow" size={20} />
                          )}
                          {Number(item.priority_level) === 1 && (
                            <MdFlag color="green" size={20} />
                          )}
                        </button>
                      </span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </CheckListFunnel>
      </Container>
    </>
  );
};

export default EventCheckListSection;
