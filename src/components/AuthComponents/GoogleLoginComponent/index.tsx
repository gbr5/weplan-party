import React, { useCallback } from 'react';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useAuth } from '../../../hooks/auth';
import { refreshGoogleTokenSetup } from '../../../utils/refreshGoogleTokenSetup';

import { Container } from './styles';

interface IProps {
  buttonText: string;
}

const GoogleLoginComponent: React.FC<IProps> = ({ buttonText }) => {
  const { signInWithGoogle } = useAuth();
  const url = process.env.REACT_APP_URL;
  const client = process.env.REACT_APP_URL_GOOGLE_CLIENT_ID;

  const onSuccess = useCallback(
    (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if ('googleId' in res) {
        // console.log('[Google Success] user =>', res);
        signInWithGoogle({
          email: res.profileObj.email,
          googleToken: res.tokenId,
        });
        refreshGoogleTokenSetup(res);
      }
    },
    [signInWithGoogle],
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

export default GoogleLoginComponent;
