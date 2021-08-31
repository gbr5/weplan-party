import React, { MouseEventHandler } from 'react';

import { FiHelpCircle, FiHome, FiMusic } from 'react-icons/fi';
import {
  MdBuild,
  MdFolderSpecial,
  MdLinkedCamera,
  MdLocalBar,
  MdLocalDining,
  MdLocalFlorist,
} from 'react-icons/md';
import WindowUnFormattedContainer from '../WindowUnFormattedContainer';

import { Container, SuppliersContainer } from './styles';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  handleSetSupplierCategory: Function;
}

const SelectSupplierCategoryWindow: React.FC<IProps> = ({
  onHandleCloseWindow,
  handleSetSupplierCategory,
}: IProps) => {
  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 18,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
      zIndex={17}
    >
      <Container>
        <h1>Categoria de Fornecedores</h1>
        <SuppliersContainer>
          <button
            type="button"
            onClick={() => handleSetSupplierCategory('Planning')}
          >
            <MdFolderSpecial size={50} />
            Planejamento
          </button>
          <button
            type="button"
            onClick={() => handleSetSupplierCategory('Event_Desing')}
          >
            <MdLocalFlorist size={50} />
            Decoração
          </button>
          <button
            type="button"
            onClick={() => handleSetSupplierCategory('Venue')}
          >
            <FiHome size={50} />
            Espaços e Igrejas
          </button>
          <button
            type="button"
            onClick={() => handleSetSupplierCategory('Catering')}
          >
            <MdLocalDining size={50} />
            Buffet, lanches e Doces
          </button>
          <button
            type="button"
            onClick={() => handleSetSupplierCategory('Film_And_Photography')}
          >
            <MdLinkedCamera size={50} />
            Fotos e Filmes
          </button>
          <button
            type="button"
            onClick={() => handleSetSupplierCategory('Entertainment_Artists')}
          >
            <FiMusic size={50} />
            Artistas e Entretenimento
          </button>
          <button
            type="button"
            onClick={() => handleSetSupplierCategory('Bartenders_And_Drinks')}
          >
            <MdLocalBar size={50} />
            Bar e Bebidas
          </button>
          <button
            type="button"
            onClick={() =>
              handleSetSupplierCategory('Dance_Floors_Structures_And_Lighting')
            }
          >
            <MdBuild size={50} />
            Estruturas, Cênica e Boate
          </button>
          <button
            type="button"
            onClick={() => handleSetSupplierCategory('Others')}
          >
            <FiHelpCircle size={50} />
            Outros
          </button>
        </SuppliersContainer>
      </Container>
    </WindowUnFormattedContainer>
  );
};

export default SelectSupplierCategoryWindow;
