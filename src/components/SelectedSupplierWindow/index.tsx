import React from 'react';

import { MouseEventHandler } from 'react-select';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import {
  SelectedSupplierDrawer,
  EditSelectedSupplierButton,
  DeleteButton,
} from './styles';
import avatar_placeholder from '../../assets/WePlanLogo.svg';
import WindowContainer from '../WindowContainer';
import { useEventVariables } from '../../hooks/eventVariables';

interface IPropsDTO {
  onHandleSelectedSupplierDrawer: MouseEventHandler;
  onUpdateSelectedSupplierDrawer: MouseEventHandler;
  onDeleteSelectedSupplierDrawer: MouseEventHandler;
}

const SelectedSupplierWindow: React.FC<IPropsDTO> = ({
  onHandleSelectedSupplierDrawer,
  onUpdateSelectedSupplierDrawer,
  onDeleteSelectedSupplierDrawer,
}: IPropsDTO) => {
  const { selectedEventSupplier, isOwner } = useEventVariables();
  return (
    <WindowContainer
      onHandleCloseWindow={onHandleSelectedSupplierDrawer}
      containerStyle={{
        zIndex: 15,
        top: '0%',
        left: '0%',
        height: '100%',
        width: '100%',
      }}
    >
      <SelectedSupplierDrawer>
        <h1>Fornecedor Selecionado</h1>
        <div>
          {!selectedEventSupplier.eventWeplanSupplier && (
            <>
              <h1>{selectedEventSupplier.name}</h1>
              <strong>{selectedEventSupplier.supplier_sub_category}</strong>
            </>
          )}
          {selectedEventSupplier.eventWeplanSupplier &&
            selectedEventSupplier.eventWeplanSupplier.weplanEventSupplier && (
              <>
                <h1>{selectedEventSupplier.name}</h1>
                <strong>{selectedEventSupplier.supplier_sub_category}</strong>
                <img
                  src={
                    selectedEventSupplier.eventWeplanSupplier
                      .weplanEventSupplier.avatar_url
                      ? selectedEventSupplier.eventWeplanSupplier
                          .weplanEventSupplier.avatar_url
                      : avatar_placeholder
                  }
                  alt={selectedEventSupplier.name}
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
