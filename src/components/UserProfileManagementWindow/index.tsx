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
  handleCloseWindow: Function;
}

const UserProfileManagementWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  handleCloseWindow,
}: IProps) => {
  const { user } = useAuth();

  const [section, setSection] = useState('Profile');
  const [updatedUser, setUpdatedUser] = useState({} as IUserDTO);

  const handleSection = useCallback((props: string) => {
    setSection(props);
  }, []);

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
        <SideMenu
          handleCloseWindow={handleCloseWindow}
          user={updatedUser}
          handleSection={(e: string) => handleSection(e)}
          section={section}
        />
        <Section>
          {section === 'Profile' ? (
            <ProfileSection
              userId={user.id}
              updateUser={updateUser}
              user={updatedUser}
            />
          ) : (
            <h1>{section}</h1>
          )}
        </Section>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default UserProfileManagementWindow;
