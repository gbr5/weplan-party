import React from 'react';
import { FiCheck, FiChevronRight } from 'react-icons/fi';

import { Container } from './styles';

const LatestNewsSection: React.FC = () => {
  return (
    <Container>
      <strong>Últimas Atualizações</strong>
      <ul>
        <li>
          <h3>Mensagem |</h3>
          <span>Sérgio Cerimonial:</span>
          <p>Degustação ...</p>
          <FiChevronRight size={24} />
        </li>
        <li>
          <h3>Mensagem |</h3>
          <span>Maria Doces:</span>
          <p>Bom dia Antônio, ...</p>
          <FiChevronRight size={24} />
        </li>
        <li>
          <h3>Solicitação de agendamento |</h3>
          <span>Degustação Buffet Rullus:</span>
          <p>R...</p>
          <FiChevronRight size={24} />
        </li>
        <li>
          <h3>Pedrinho Magalhães 6 anos |</h3>
          <span>Covidados:</span>
          <p>Eliane confirmou ...</p>
          <FiCheck size={24} color="#119112" />
        </li>
      </ul>
    </Container>
  );
};

export default LatestNewsSection;
