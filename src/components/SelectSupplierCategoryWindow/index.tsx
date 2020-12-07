import React from 'react';

import { FiHelpCircle, FiHome, FiMusic } from 'react-icons/fi';
import {
  MdBuild,
  MdFolderSpecial,
  MdLinkedCamera,
  MdLocalBar,
  MdLocalDining,
  MdLocalFlorist,
} from 'react-icons/md';
import WindowContainer from '../WindowContainer';

import { Container, SuppliersContainer } from './styles';

interface IProps {
  handleSupplierCategory: Function;
  handleSetSupplierCategory: Function;
}

const SelectSupplierCategoryWindow: React.FC<IProps> = ({
  handleSupplierCategory,
  handleSetSupplierCategory,
}: IProps) => {
  return (
    <WindowContainer
      onHandleCloseWindow={() => handleSupplierCategory}
      containerStyle={{
        zIndex: 99,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <h1>Categoria de Fornecedores</h1>
      <Container>
        <SuppliersContainer>
          <button
            type="button"
            onClick={() => handleSetSupplierCategory('Planning')}
          >
            <MdFolderSpecial size={50} />
            <h1>Planejamento</h1>
          </button>
          <button
            type="button"
            onClick={() => handleSetSupplierCategory('Event_Desing')}
          >
            <MdLocalFlorist size={50} />
            <h1>Decoração</h1>
          </button>
          <button
            type="button"
            onClick={() => handleSetSupplierCategory('Venue')}
          >
            <FiHome size={50} />
            <h1>Espaços e Igrejas</h1>
          </button>
          <button
            type="button"
            onClick={() => handleSetSupplierCategory('Catering')}
          >
            <MdLocalDining size={50} />
            <h1>Buffet, lanches e Doces</h1>
          </button>
          <button
            type="button"
            onClick={() => handleSetSupplierCategory('Film_And_Photography')}
          >
            <MdLinkedCamera size={50} />
            <h1>Fotos e Filmes</h1>
          </button>
          <button
            type="button"
            onClick={() => handleSetSupplierCategory('Entertainment_Artists')}
          >
            <FiMusic size={50} />
            <h1>Artistas e Entretenimento</h1>
          </button>
          <button
            type="button"
            onClick={() => handleSetSupplierCategory('Bartenders_And_Drinks')}
          >
            <MdLocalBar size={50} />
            <h1>Bar e Bebidas</h1>
          </button>
          <button
            type="button"
            onClick={() =>
              handleSetSupplierCategory('Dance_Floors_Structures_And_Lighting')
            }
          >
            <MdBuild size={50} />
            <h1>Estruturas, Cênica e Boate</h1>
          </button>
          <button
            type="button"
            onClick={() => handleSetSupplierCategory('Others')}
          >
            <FiHelpCircle size={50} />
            <h1>Outros</h1>
          </button>
        </SuppliersContainer>
      </Container>
    </WindowContainer>
  );
};

export default SelectSupplierCategoryWindow;
