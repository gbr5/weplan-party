import React from 'react';

import placeholder from '../../../../assets/WePlanLogo.svg';

import { Container } from './styles';

const FirstSection: React.FC = () => {
  return (
    <Container>
      <img src={placeholder} alt="WePlan"/>
      <div>
        <h1>Nome do Evento</h1>
        <span>
          <p>Anfitrião Master</p>
          <p>Fulano de Tal da Silva</p>
        </span>
        <span>
          <p>Tipo de Evento</p>
          <p>Não publicado</p>
        </span>
        <span>
          <p>Data</p>
          <p>Horário</p>
        </span>
        <p>Possíveis datas</p>
      </div>
      <div>
        <span>
          <p>Duração</p>
          <p>3 horas</p>
        </span>
        <span>
          <p>N° de Convidados</p>
          <p>150</p>
        </span>
        <span>
          <p>Orçamento</p>
          <p>R$ 55.000,00</p>
        </span>
        <span>
          <p>Descrição</p>
          <p>...</p>
        </span>
        <span>
          <p>País</p>
          <p>Brasil</p>
        </span>
        <span>
          <p>Estado</p>
          <p>MG</p>
        </span>
        <span>
          <p>Cidade</p>
          <p>Belo Horizonte</p>
        </span>
        <span>
          <p>Endereço</p>
          <p>Av. Brasil, 155, bairro Floresta</p>
        </span>
        <span>
          <p>Traje</p>
          <p>Livre</p>
        </span>
      </div>
    </Container>
  );
};

export default FirstSection;
