import React, { useCallback } from 'react';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';

import { Container } from './styles';

interface IProps {
  buttonText: string;
}

const GoogleSignupComponent: React.FC<IProps> = ({ buttonText }) => {
  const { addToast } = useToast();
  const {
    signInWithGoogle,
    createdefaultContactInfo,
    createPersonInfo,
  } = useAuth();
  const url = process.env.PUBLIC_URL;
  // const back = process.env.REACT_APP_API_URL;
  const client = process.env.REACT_APP_URL_GOOGLE_CLIENT_ID;
  // console.log({ url });
  // console.log({ back });
  // console.log({ client });

  const onSuccess = useCallback(
    async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      // console.log('[Login Success] currentUser:', res);
      if ('googleId' in res) {
        const { email, name, givenName, familyName } = res.profileObj;
        const findByNameOrEmail = await api.get(
          `user/name-or-email?name=${name}&email=${email}`,
        );

        if (findByNameOrEmail.data.email === email) {
          signInWithGoogle({
            email,
            googleToken: res.tokenId,
          });
        }
        if (findByNameOrEmail.data.name === name) {
          const newName = email.split('@')[0];
          const findByName = await api.get(
            `user/name-or-email?name=${newName}`,
          );
          if (findByName) {
            const trimmed_family_name = familyName.trim();
            const findByNewName = await api.get(
              `user/name-or-email?name=${`${givenName}_${trimmed_family_name}`}`,
            );

            if (findByNewName) {
              addToast({
                type: 'error',
                title: 'Não foi possível criar uma conta com o Google',
                description: 'Tente fazer seu cadastro normalmente',
              });
            } else {
              const response = await api.post('/users', {
                name: `${givenName}_${trimmed_family_name}`,
                email: res.profileObj.email,
                password: res.googleId,
                isCompany: false,
              });
              createdefaultContactInfo(response.data.id);
              createPersonInfo({
                userId: response.data.id,
                first_name: givenName,
                last_name: familyName,
              });
            }
          } else {
            const response = await api.post('/users', {
              name: newName,
              email: res.profileObj.email,
              password: res.googleId,
              isCompany: false,
            });
            createdefaultContactInfo(response.data.id);
            createPersonInfo({
              userId: response.data.id,
              first_name: givenName,
              last_name: familyName,
            });
          }
        } else {
          const response = await api.post('/users', {
            name: res.profileObj.name,
            email: res.profileObj.email,
            password: res.googleId,
            isCompany: false,
          });
          createdefaultContactInfo(response.data.id);
          createPersonInfo({
            userId: response.data.id,
            first_name: givenName,
            last_name: familyName,
          });
        }

        signInWithGoogle({
          email,
          googleToken: res.tokenId,
        });
        addToast({
          type: 'success',
          title: 'Estamos preparando o seu dashboard!',
        });
      }
    },
    [signInWithGoogle, createPersonInfo, addToast, createdefaultContactInfo],
  );
  const onFailure = useCallback(
    async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      console.log('[Login Failed] response:', res);
    },
    [],
  );

  return (
    <Container>
      {url && client && (
        <GoogleLogin
          clientId={client}
          buttonText={buttonText}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={url}
          isSignedIn
        />
      )}
    </Container>
  );
};

export default GoogleSignupComponent;
