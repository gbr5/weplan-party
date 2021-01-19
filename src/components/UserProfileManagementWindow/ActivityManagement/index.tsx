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
  const { user, signOut } = useAuth();
  const [activationConfirmation, setActivationConfirmation] = useState(false);
  const [deleteProfileConfirmation, setDeleteProfileConfirmation] = useState(
    false,
  );

  const handleActivationProfile = useCallback(async () => {
    try {
      await api.put(`user/activation/${user.id}`, {
        isActive: false,
      });
      signOut();
    } catch (err) {
      throw new Error(err);
    }
  }, [user, signOut]);
  const deleteProfile = useCallback(async () => {
    try {
      await api.put(`user/delete/${user.id}`);
      signOut();
    } catch (err) {
      throw new Error(err);
    }
  }, [user, signOut]);

  const handleActivationConfirmation = useCallback(
    (props: boolean) => {
      if (props) {
        handleActivationProfile();
      } else {
        setActivationConfirmation(false);
      }
    },
    [handleActivationProfile],
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
    >
      <Container>
        <Section>
          <h1>Suspender perfil</h1>
          <div>
            <button
              type="button"
              onClick={() => setActivationConfirmation(true)}
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
        {activationConfirmation && (
          <BooleanQuestionWindow
            onHandleCloseWindow={() => setActivationConfirmation(false)}
            question="Deseja suspender o seu perfil?"
            selectBooleanOption={(e: boolean) =>
              handleActivationConfirmation(e)
            }
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
