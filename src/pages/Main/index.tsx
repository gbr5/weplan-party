import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import door from '../../assets/door.svg';
import weplanLogo from '../../assets/WePlanLogo.svg';

import {
  Container,
  LogoContainer,
  Content,
  AnimationContainer,
  Background,
  Slogan,
  ButtonContainer,
} from './styles';

const Main: React.FC = () => {
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <LogoContainer>
            <img src={weplanLogo} alt="WePlan - Party" />
            <h1>WePlan</h1>
          </LogoContainer>
          <ButtonContainer>
            <div>
              <Link to="/signup">
                <FiLogIn />
                Criar conta
              </Link>
            </div>
            <div>
              <Link to="/signin">
                <img src={door} alt="SignIn" />
                Login
              </Link>
            </div>
          </ButtonContainer>
        </AnimationContainer>
        <Slogan>
          <h1>
            <strong>Work SMART</strong> & <strong>Party HARD</strong>
          </h1>
        </Slogan>
      </Content>

      <Background />
    </Container>
  );
};

export default Main;
