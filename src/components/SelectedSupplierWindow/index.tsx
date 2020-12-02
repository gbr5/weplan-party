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

interface ISelectedSupplierDTO {
  id: string;
  name: string;
}

interface IPropsDTO {
  isOwner: boolean;
  selectedSupplier: ISelectedSupplierDTO;
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
        zIndex: 1000,
        top: '20%',
        left: '20%',
        height: '60%',
        width: '60%',
      }}
    >
      <SelectedSupplierDrawer>
        <img src={avatar_placeholder} alt={selectedSupplier.name} />

        <h1>{selectedSupplier.name}</h1>

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
