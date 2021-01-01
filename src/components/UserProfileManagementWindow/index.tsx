import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import IUserDTO from '../../dtos/IUserDTO';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';
import ProfileSection from './ProfileSection';
import SideMenu from './SideMenu';

import { Container, Section } from './styles';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
}

const UserProfileManagementWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
}: IProps) => {
  const { user } = useAuth();

  const [updatedUser, setUpdatedUser] = useState({} as IUserDTO);

  const updateUser = useCallback(() => {
    try {
      api.get<IUserDTO>(`users/${user.id}`).then(response => {
        setUpdatedUser(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [user]);

  useEffect(() => {
    updateUser();
  }, [updateUser]);

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 15,
        top: '10%',
        left: '0%',
        height: '90%',
        width: '100%',
      }}
    >
      <Container>
        <SideMenu user={updatedUser} />
        <Section>
          <ProfileSection
            userId={user.id}
            updateUser={updateUser}
            user={updatedUser}
          />
        </Section>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default UserProfileManagementWindow;
