import React, { useCallback, useState } from 'react';
import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';
import BooleanQuestionWindow from '../../BooleanQuestionWindow';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';

import { Container, Section } from './styles';

interface IProps {
  closeWindow: Function;
}

const ActivityManagement: React.FC<IProps> = ({ closeWindow }: IProps) => {
  const { user, handleSignOut } = useAuth();
  const [suspendProfileConfirmation, setSuspendProfileConfirmation] = useState(
    false,
  );
  const [deleteProfileConfirmation, setDeleteProfileConfirmation] = useState(
    false,
  );

  const handleSuspendProfile = useCallback(async () => {
    try {
      await api.put(`user/suspend/${user.id}`, {
        isActive: false,
      });
      handleSignOut();
    } catch (err) {
      throw new Error(err);
    }
  }, [user, handleSignOut]);
  const deleteProfile = useCallback(async () => {
    try {
      await api.put(`user/delete/${user.id}`);
      handleSignOut();
    } catch (err) {
      throw new Error(err);
    }
  }, [user, handleSignOut]);

  const handleSuspendConfirmation = useCallback(
    (props: boolean) => {
      if (props) {
        handleSuspendProfile();
      } else {
        setSuspendProfileConfirmation(false);
      }
    },
    [handleSuspendProfile],
  );
  const handleDeleteProfileConfirmation = useCallback(
    (props: boolean) => {
      if (props) {
        deleteProfile();
      } else {
        setDeleteProfileConfirmation(false);
      }
    },
    [deleteProfile],
  );

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 16,
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
      }}
      zIndex={15}
    >
      <Container>
        <Section>
          <h1>Suspender perfil</h1>
          <div>
            <button
              type="button"
              onClick={() => setSuspendProfileConfirmation(true)}
            >
              Suspender
            </button>
            <span>
              <p>
                O perfil é apenas congelado. Para recuperar basta fazer login
              </p>
              <p>
                Os demais usuários visualizam apenas suas ações realizadas antes
                da suspensão
              </p>
              <p>Porém não tem mais acesso ao seu perfil.</p>
            </span>
          </div>
        </Section>
        {suspendProfileConfirmation && (
          <BooleanQuestionWindow
            onHandleCloseWindow={() => setSuspendProfileConfirmation(false)}
            question="Deseja suspender o seu perfil?"
            selectBooleanOption={(e: boolean) => handleSuspendConfirmation(e)}
          />
        )}
        <Section>
          <h1>Deletar perfil</h1>
          <div>
            <button
              type="button"
              onClick={() => setDeleteProfileConfirmation(true)}
            >
              Deletar
            </button>
            <p>O perfil é deletado definitivamente.</p>
          </div>
        </Section>
        {deleteProfileConfirmation && (
          <BooleanQuestionWindow
            onHandleCloseWindow={() => setDeleteProfileConfirmation(false)}
            question="Deseja deletar o seu perfil?"
            selectBooleanOption={(e: boolean) =>
              handleDeleteProfileConfirmation(e)
            }
          />
        )}
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default ActivityManagement;
