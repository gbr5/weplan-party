import React from 'react';
import { useEventTasks } from '../../../../hooks/eventTasks';
import Button from '../../../Button';
import { WindowHeader } from '../../../WindowHeader';
import WindowUnFormattedContainer from '../../../WindowUnFormattedContainer';

import { Container, Description } from './styles';

export function EventTaskFollowersDescriptionWindow(): JSX.Element {
  const { handleEventTaskFollowersDescriptionWindow } = useEventTasks();

  return (
    <WindowUnFormattedContainer
      zIndex={24}
      onHandleCloseWindow={handleEventTaskFollowersDescriptionWindow}
      containerStyle={{
        zIndex: 25,
        top: '5%',
        left: '2%',
        height: '85%',
        width: '96%',
      }}
    >
      <Container>
        <WindowHeader overTitle="Descrição" title="Seguidores de Tarefas" />
        <Description>
          Os seguidores irão receber uma notificação via app e via e-mail sempre
          que a tarefa for atualizada.
        </Description>
        <Description>
          Apenas usuários com perfil WePlan poderão ser adicionados como
          seguidores.
        </Description>
        <Description>
          O seguidor também poderá interagir e visualizar todas as informações
          da tarefa.
        </Description>
        <Description>
          Por isto é muito importante que você adicione apenas pessoas que
          poderão visualizar as informações inseridas.
        </Description>
        <Description>
          Caso seja necessário, crie uma tarefa específica para a pessoa.
        </Description>
      </Container>
      <Button onClick={handleEventTaskFollowersDescriptionWindow}>
        Fechar
      </Button>
    </WindowUnFormattedContainer>
  );
}
