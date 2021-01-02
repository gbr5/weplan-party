import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import {
  FiCheckSquare,
  FiChevronRight,
  FiEdit3,
  FiSquare,
  FiUser,
} from 'react-icons/fi';
import { MdPersonAdd } from 'react-icons/md';
import IEventSupplierDTO from '../../dtos/IEventSupplierDTO';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import EventSupplierWindow from '../EventSupplierWindow';
import SelectedSupplierWindow from '../SelectedSupplierWindow';
import TransactionAgreementForm from '../TransactionAgreementForm';

import { Container, Supplier, BooleanNavigationButton } from './styles';
import getValidationErrors from '../../utils/getValidationErros';
import DeleteConfirmationWindow from '../DeleteConfirmationWindow';
import BooleanQuestionWindow from '../BooleanQuestionWindow';
import SelectSupplierCategoryWindow from '../SelectSupplierCategoryWindow';
import ISupplierSubCategoryDTO from '../../dtos/ISupplierSubCategoryDTO';
import SelectSupplierSubCategoryWindow from '../SelectSupplierSubCategoryWindow';
import AddSupplierWindow from '../AddSupplierWindow';

interface IProps {
  handleGetSuppliers: Function;
  handleGetHiredSuppliers: Function;
  selectedSuppliers: IEventSupplierDTO[];
  hiredSuppliers: IEventSupplierDTO[];
  isOwner: boolean;
  eventId: string;
}

const EventSupplierSection: React.FC<IProps> = ({
  handleGetSuppliers,
  selectedSuppliers,
  handleGetHiredSuppliers,
  hiredSuppliers,
  isOwner,
  eventId,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [isHiredDrawer, setIsHiredDrawer] = useState(false);
  const [isHiredMessage, setIsHiredMessage] = useState('');
  const [isHired, setIsHired] = useState(false);
  const [addSupplierDrawer, setAddSupplierDrawer] = useState(false);
  const [deleteHiredSupplierDrawer, setDeleteHiredSupplierDrawer] = useState(
    false,
  );
  const [
    deleteSelectedSupplierDrawer,
    setDeleteSelectedSupplierDrawer,
  ] = useState(false);
  const [supplierCategory, setSupplierCategory] = useState('');
  const [supplierSubCategory, setSupplierSubCategory] = useState('');
  const [supplierSubCategories, setSupplierSubCategories] = useState<
    ISupplierSubCategoryDTO[]
  >([]);
  const [supplierInfo, setSupplierInfo] = useState<IEventSupplierDTO>(
    {} as IEventSupplierDTO,
  );
  const [supplierCategoryWindow, setSupplierCategoryWindow] = useState(false);
  const [supplierSubCategoryWindow, setSupplierSubCategoryWindow] = useState(
    false,
  );

  const [hiredSupplier, setHiredSupplier] = useState<IEventSupplierDTO>(
    {} as IEventSupplierDTO,
  );
  const [selectedSupplier, setSelectedSupplier] = useState<IEventSupplierDTO>(
    {} as IEventSupplierDTO,
  );

  const [hiredSupplierWindow, setHiredSupplierWindow] = useState(false);
  const [selectedSupplierWindow, setSelectedSupplierWindow] = useState(false);
  const [hiredSuppliersSection, setHiredSuppliersSection] = useState(true);

  const [transactionAgreementWindow, setTransactionAgreementWindow] = useState(
    false,
  );
  const closeAllWindows = useCallback(() => {
    setHiredSupplierWindow(false);
    setSelectedSupplierWindow(false);
    setSupplierCategoryWindow(false);
  }, []);

  const handleHiredSuppliersSection = useCallback(props => {
    setHiredSuppliersSection(props);
  }, []);
  const handleCreateTransactionWindow = useCallback(props => {
    setSupplierInfo(props);
    setTransactionAgreementWindow(true);
  }, []);
  const handleHiredSupplierWindow = useCallback(
    (props: IEventSupplierDTO) => {
      closeAllWindows();
      setHiredSupplier(props);
      setHiredSupplierWindow(true);
    },
    [closeAllWindows],
  );
  const handleSelectedSupplierWindow = useCallback(
    (props: IEventSupplierDTO) => {
      closeAllWindows();
      setSelectedSupplier(props);
      setSelectedSupplierWindow(true);
    },
    [closeAllWindows],
  );
  const handleSupplierCategory = useCallback(() => {
    setSupplierSubCategoryWindow(supplierCategoryWindow);
    setSupplierCategoryWindow(!supplierCategoryWindow);
  }, [supplierCategoryWindow]);

  const handleGetSupplierSubCategory = useCallback(() => {
    try {
      api
        .get<ISupplierSubCategoryDTO[]>(
          `/suppliers/categories/sub-categories/${supplierCategory}`,
        )
        .then(response => {
          setSupplierSubCategories(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [supplierCategory]);
  const handleAddSupplierDrawer = useCallback(
    props => {
      if (props === '') {
        handleSupplierCategory();
        closeAllWindows();
      } else {
        handleSupplierCategory();
        setSupplierSubCategory(props);
        closeAllWindows();
        setAddSupplierDrawer(true);
      }
    },
    [closeAllWindows, handleSupplierCategory],
  );
  const handleIsHiredDrawer = useCallback(() => {
    setIsHiredDrawer(!isHiredDrawer);
  }, [isHiredDrawer]);
  const handleCloseAddSupplierWindow = useCallback(() => {
    setSupplierCategory('');
    setSupplierSubCategory('');

    setIsHired(false);
    setSelectedSupplier({} as IEventSupplierDTO);

    handleGetSuppliers();
    handleGetHiredSuppliers();
    setAddSupplierDrawer(false);
  }, [handleGetSuppliers, handleGetHiredSuppliers]);

  const handleDeleteHiredSupplier = useCallback(async () => {
    try {
      await api.delete(
        `/events/${eventId}/event-suppliers/${hiredSupplier.id}`,
      );

      addToast({
        type: 'success',
        title: 'Fornecedor excluído com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });

      setHiredSupplierWindow(false);
      setDeleteHiredSupplierDrawer(false);
      handleGetHiredSuppliers();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
      }

      addToast({
        type: 'error',
        title: 'Erro ao excluir fornecedor',
        description: 'Erro ao excluir o fornecedor, tente novamente.',
      });
    }
  }, [eventId, hiredSupplier, addToast, handleGetHiredSuppliers]);
  const handleDeleteSelectedSupplier = useCallback(async () => {
    try {
      await api.delete(
        `/events/${eventId}/event-suppliers/${selectedSupplier.id}`,
      );

      addToast({
        type: 'success',
        title: 'Fornecedor excluído com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });

      setSelectedSupplierWindow(false);
      setDeleteSelectedSupplierDrawer(false);
      handleGetSuppliers();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
      }

      addToast({
        type: 'error',
        title: 'Erro ao excluir fornecedor',
        description: 'Erro ao excluir o fornecedor, tente novamente.',
      });
    }
  }, [eventId, selectedSupplier, addToast, handleGetSuppliers]);

  const handleSetSupplierCategory = useCallback((props: string) => {
    setSupplierCategoryWindow(false);
    setSupplierSubCategoryWindow(true);
    setSupplierCategory(props);
  }, []);
  const handleIsHiredQuestion = useCallback((is_hired: boolean) => {
    if (is_hired === true) {
      setIsHiredMessage('Contratado S2!');
      setIsHired(true);
      setIsHiredDrawer(false);
    } else {
      setIsHiredMessage('Avaliando ...');
      setIsHired(false);
      setIsHiredDrawer(false);
    }
  }, []);

  const handleCloseSupplierSubCategoryWindow = useCallback(() => {
    setSupplierSubCategoryWindow(false);
    setSupplierSubCategory('');
    setSupplierCategory('');
  }, []);

  useEffect(() => {
    if (supplierCategory !== '') {
      handleGetSupplierSubCategory();
    }
  }, [supplierCategory, handleGetSupplierSubCategory]);

  let supplierCount = 0;
  let hiredSupplierCount = 0;

  return (
    <>
      {!!addSupplierDrawer && (
        <AddSupplierWindow
          eventId={eventId}
          handleCloseWindow={handleCloseAddSupplierWindow}
          handleCreateTransactionWindow={handleCreateTransactionWindow}
          handleIsHiredDrawer={handleIsHiredDrawer}
          isHired={isHired}
          isHiredMessage={isHiredMessage}
          onHandleCloseWindow={() => handleCloseAddSupplierWindow()}
          supplierCategory={supplierCategory}
          supplierSubCategory={supplierSubCategory}
        />
      )}
      {!!isHiredDrawer && (
        <BooleanQuestionWindow
          selectBooleanOption={handleIsHiredQuestion}
          onHandleCloseWindow={() => setIsHiredDrawer(false)}
          question="Fornecedor contratado?"
        />
      )}
      {/* HIRED SUPPLIERS */}
      {!!deleteHiredSupplierDrawer && (
        <DeleteConfirmationWindow
          handleDelete={() => handleDeleteHiredSupplier()}
          onHandleCloseWindow={() => setDeleteHiredSupplierDrawer(false)}
        />
      )}
      {/* SELECTED SUPPLIERS */}
      {!!deleteSelectedSupplierDrawer && (
        <DeleteConfirmationWindow
          handleDelete={() => handleDeleteSelectedSupplier()}
          onHandleCloseWindow={() => setDeleteSelectedSupplierDrawer(false)}
        />
      )}
      {!!selectedSupplierWindow && (
        <SelectedSupplierWindow
          isOwner={isOwner}
          selectedSupplier={selectedSupplier}
          onHandleSelectedSupplierDrawer={() =>
            setSelectedSupplierWindow(false)
          }
          onUpdateSelectedSupplierDrawer={() => setSelectedSupplierWindow(true)}
          onDeleteSelectedSupplierDrawer={() =>
            setDeleteSelectedSupplierDrawer(true)
          }
        />
      )}
      {!!supplierCategoryWindow && (
        <SelectSupplierCategoryWindow
          handleSetSupplierCategory={(e: string) =>
            handleSetSupplierCategory(e)
          }
          onHandleCloseWindow={() => setSupplierCategoryWindow(false)}
        />
      )}
      {supplierSubCategoryWindow && (
        <SelectSupplierSubCategoryWindow
          handleCloseWindow={handleCloseSupplierSubCategoryWindow}
          handleAddSupplierDrawer={(e: string) => handleAddSupplierDrawer(e)}
          supplierSubCategories={supplierSubCategories}
        />
      )}
      {!!transactionAgreementWindow && (
        <TransactionAgreementForm
          hiredSupplier={supplierInfo}
          onHandleCloseWindow={() => setTransactionAgreementWindow(false)}
          handleGetSuppliers={handleGetSuppliers}
          getHiredSuppliers={handleGetHiredSuppliers}
          handleCloseWindow={() => setTransactionAgreementWindow(false)}
        />
      )}
      {!!hiredSupplierWindow && (
        <EventSupplierWindow
          isOwner={isOwner}
          handleGetSuppliers={handleGetSuppliers}
          getHiredSuppliers={handleGetHiredSuppliers}
          eventSupplier={hiredSupplier}
          onHandleEventSupplierDrawer={() => setHiredSupplierWindow(false)}
          onHandleEventSupplierUpdate={() => setHiredSupplierWindow(true)}
          onHandleDeleteEventSupplierDrawer={() =>
            setDeleteHiredSupplierDrawer(true)
          }
        />
      )}

      <Container>
        <h1>Fornecedores</h1>
        <span>
          <BooleanNavigationButton
            booleanActiveButton={hiredSuppliersSection}
            type="button"
            onClick={() => handleHiredSuppliersSection(true)}
          >
            Selecionados
          </BooleanNavigationButton>

          <BooleanNavigationButton
            type="button"
            onClick={() => handleHiredSuppliersSection(false)}
            booleanActiveButton={!hiredSuppliersSection}
          >
            Contratados
          </BooleanNavigationButton>

          {isOwner && (
            <span>
              <button type="button" onClick={handleSupplierCategory}>
                <MdPersonAdd size={30} />
              </button>
            </span>
          )}
        </span>

        {!hiredSuppliersSection && <h3>{hiredSuppliers.length}</h3>}

        {hiredSuppliersSection && <h3>{selectedSuppliers.length}</h3>}

        <div>
          {hiredSuppliersSection &&
            selectedSuppliers.map(sSupplier => {
              supplierCount += 1;

              return (
                <Supplier key={sSupplier.id}>
                  <span>
                    <p>{supplierCount}</p>
                    <button
                      type="button"
                      onClick={() => handleSelectedSupplierWindow(sSupplier)}
                    >
                      <strong>{sSupplier.name}</strong>
                      <p>{sSupplier.supplier_sub_category}</p>
                      <FiEdit3 size={16} />
                    </button>
                  </span>

                  {sSupplier.eventWeplanSupplier &&
                    sSupplier.eventWeplanSupplier.weplanEventSupplier && (
                      <button type="button">
                        <FiUser size={24} />
                      </button>
                    )}

                  <div>
                    {isOwner && (
                      <button
                        type="button"
                        onClick={() => handleCreateTransactionWindow(sSupplier)}
                      >
                        {sSupplier.isHired ? (
                          <FiCheckSquare size={24} />
                        ) : (
                          <FiSquare size={24} />
                        )}
                      </button>
                    )}
                  </div>
                </Supplier>
              );
            })}

          {!hiredSuppliersSection &&
            hiredSuppliers.map(hSupplier => {
              hiredSupplierCount += 1;
              return (
                <Supplier key={hSupplier.id}>
                  <span>
                    <p>{hiredSupplierCount}</p>
                    {isOwner ? (
                      <button
                        type="button"
                        onClick={() => handleHiredSupplierWindow(hSupplier)}
                      >
                        <strong>{hSupplier.name}</strong>
                        <p>{hSupplier.supplier_sub_category}</p>

                        <FiChevronRight size={16} />
                      </button>
                    ) : (
                      <button type="button">
                        <strong>{hSupplier.name}</strong>{' '}
                        <p>{hSupplier.supplier_sub_category}</p>
                      </button>
                    )}
                  </span>
                  {hSupplier.eventWeplanSupplier &&
                    hSupplier.eventWeplanSupplier.weplanEventSupplier && (
                      <button type="button">
                        <FiUser size={24} />
                      </button>
                    )}
                </Supplier>
              );
            })}
        </div>
      </Container>
    </>
  );
};

export default EventSupplierSection;
