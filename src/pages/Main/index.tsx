import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import door from '../../assets/door.svg';
import logo from '../../assets/weplan.svg';
import logoSVG from '../../assets/WePlanLogo.svg';

import { Container, Content, AnimationContainer, Slogan } from './styles';

const Main: React.FC = () => {
  return (
    <Container>
      <span>
        <img src={logoSVG} alt="WePlan - Party" />
        <img src={logo} alt="WePlan - Party" />
      </span>
      <Content>
        <AnimationContainer>
          <div>
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
          </div>
        </AnimationContainer>
      </Content>

      <Slogan>
        <h1>
          Work <strong>SMART</strong> & Party <strong>HARD!</strong>
        </h1>
      </Slogan>
    </Container>
  );
};

export default Main;
