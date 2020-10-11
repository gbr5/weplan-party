import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import door from '../../assets/door.svg';
import logo from '../../assets/weplan.svg';

import { Container, Content, AnimationContainer } from './styles';

const Main: React.FC = () => {
  return (
    <Container>
      <span>
        <img src={logo} alt="" />
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
                <img
                  src={door}
                  alt="SignIn"
                  style={{ width: '40px', height: '40px' }}
                />
                Login
              </Link>
            </div>
          </div>
        </AnimationContainer>

        <span>
          <h1>
            Work hard, <strong>PARTY HARDER!</strong>
          </h1>
        </span>
      </Content>
    </Container>
  );
};

export default Main;
