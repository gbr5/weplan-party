import React from 'react';

import { MouseEventHandler } from 'react-select';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import {
  SelectedSupplierDrawer,
  EditSelectedSupplierButton,
  DeleteButton,
} from './styles';
import avatar_placeholder from '../../assets/avatar_placeholder.jpg';
import WindowContainer from '../WindowContainer';

import IEventSupplierDTO from '../../dtos/IEventSupplierDTO';

interface IPropsDTO {
  isOwner: boolean;
  selectedSupplier: IEventSupplierDTO;
  onHandleSelectedSupplierDrawer: MouseEventHandler;
  onUpdateSelectedSupplierDrawer: MouseEventHandler;
  onDeleteSelectedSupplierDrawer: MouseEventHandler;
}

const SelectedSupplierWindow: React.FC<IPropsDTO> = ({
  isOwner,
  selectedSupplier,
  onHandleSelectedSupplierDrawer,
  onUpdateSelectedSupplierDrawer,
  onDeleteSelectedSupplierDrawer,
}: IPropsDTO) => {
  return (
    <WindowContainer
      onHandleCloseWindow={onHandleSelectedSupplierDrawer}
      containerStyle={{
        zIndex: 15,
        top: '20%',
        left: '20%',
        height: '60%',
        width: '60%',
      }}
    >
      <SelectedSupplierDrawer>
        <h1>Fornecedor Selecionado</h1>
        <div>
          {!selectedSupplier.eventWeplanSupplier && (
            <>
              <h1>{selectedSupplier.name}</h1>
              <strong>{selectedSupplier.supplier_sub_category}</strong>
            </>
          )}
          {selectedSupplier.eventWeplanSupplier &&
            selectedSupplier.eventWeplanSupplier.weplanEventSupplier && (
              <>
                <h1>{selectedSupplier.name}</h1>
                <strong>{selectedSupplier.supplier_sub_category}</strong>
                <img
                  src={
                    selectedSupplier.eventWeplanSupplier.weplanEventSupplier
                      .avatar_url
                      ? selectedSupplier.eventWeplanSupplier.weplanEventSupplier
                          .avatar_url
                      : avatar_placeholder
                  }
                  alt={selectedSupplier.name}
                />
              </>
            )}
        </div>

        {isOwner && (
          <div>
            <EditSelectedSupplierButton
              type="button"
              onClick={onUpdateSelectedSupplierDrawer}
            >
              Editar:
              <FiEdit size={24} />
            </EditSelectedSupplierButton>
            <DeleteButton
              type="button"
              onClick={onDeleteSelectedSupplierDrawer}
            >
              Deletar
              <MdDelete size={24} />
            </DeleteButton>
          </div>
        )}
      </SelectedSupplierDrawer>
    </WindowContainer>
  );
};

export default SelectedSupplierWindow;
