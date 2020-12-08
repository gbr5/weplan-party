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
import IListEventDTO from '../../dtos/IListEventDTO';
import ISelectedSupplierDTO from '../../dtos/ISelectedSupplierDTO';
import ISupplierDTO from '../../dtos/ISupplierDTO';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import EventSupplierWindow from '../EventSupplierWindow';
import SelectedSupplierWindow from '../SelectedSupplierWindow';
import SupplierServiceOrderFormWindow from '../SupplierServiceOrderFormWindow';
import SuppliersListDrawer from '../SuppliersListDrawer';
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
  pageEvent: IListEventDTO;
  handleGetSuppliers: Function;
  handleGetHiredSuppliers: Function;
  selectedSuppliers: ISelectedSupplierDTO[];
  hiredSuppliers: ISelectedSupplierDTO[];
}

const EventSupplierSection: React.FC<IProps> = ({
  handleGetSuppliers,
  selectedSuppliers,
  handleGetHiredSuppliers,
  hiredSuppliers,
  pageEvent,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [isHiredDrawer, setIsHiredDrawer] = useState(false);
  const [isHiredMessage, setIsHiredMessage] = useState('');
  const [isHired, setIsHired] = useState(false);
  const [weplanSupplier, setWeplanSupplier] = useState(false);
  const [supplierServiceOrderWindow, setSupplierServiceOrderWindow] = useState(
    false,
  );
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
  const [selectedWeplanSupplier, setSelectedWeplanSupplier] = useState<
    ISupplierDTO
  >({} as ISupplierDTO);
  const [supplierInfo, setSupplierInfo] = useState<ISelectedSupplierDTO>(
    {} as ISelectedSupplierDTO,
  );
  const [supplierCategoryWindow, setSupplierCategoryWindow] = useState(false);
  const [supplierSubCategoryWindow, setSupplierSubCategoryWindow] = useState(
    false,
  );

  const [hiredSupplier, setHiredSupplier] = useState<ISelectedSupplierDTO>(
    {} as ISelectedSupplierDTO,
  );
  const [selectedSupplier, setSelectedSupplier] = useState<
    ISelectedSupplierDTO
  >({} as ISelectedSupplierDTO);

  const [hiredSupplierWindow, setHiredSupplierWindow] = useState(false);
  const [selectedSupplierWindow, setSelectedSupplierWindow] = useState(false);
  const [hiredSuppliersSection, setHiredSuppliersSection] = useState(true);
  const [weplanSupplierListWindow, setWeplanSupplierListWindow] = useState(
    false,
  );
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
    (props: ISelectedSupplierDTO) => {
      closeAllWindows();
      setHiredSupplier(props);
      setHiredSupplierWindow(true);
    },
    [closeAllWindows],
  );
  const handleSelectedSupplierWindow = useCallback(
    (props: ISelectedSupplierDTO) => {
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

    if (weplanSupplier && !isHired) {
      setSupplierServiceOrderWindow(true);
    }
    setIsHired(false);
    setWeplanSupplier(false);
    setSelectedSupplier({} as ISelectedSupplierDTO);

    handleGetSuppliers();
    handleGetHiredSuppliers();
    setAddSupplierDrawer(false);
  }, [handleGetSuppliers, handleGetHiredSuppliers, weplanSupplier, isHired]);

  const handleDeleteHiredSupplier = useCallback(async () => {
    try {
      await api.delete(
        `/events/${pageEvent.id}/event-suppliers/${hiredSupplier.id}`,
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
  }, [pageEvent.id, hiredSupplier, addToast, handleGetHiredSuppliers]);
  const handleDeleteSelectedSupplier = useCallback(async () => {
    try {
      await api.delete(
        `/events/${pageEvent.id}/event-suppliers/${selectedSupplier.id}`,
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
  }, [pageEvent.id, selectedSupplier, addToast, handleGetSuppliers]);

  const handleSetWeplanSupplierListWindow = useCallback((props: boolean) => {
    if (props) {
      setWeplanSupplierListWindow(true);
    }
    setWeplanSupplier(props);
  }, []);

  const handleSetSelectedWeplanSupplier = useCallback((props: ISupplierDTO) => {
    setSelectedWeplanSupplier(props);
    setWeplanSupplierListWindow(false);
  }, []);

  const handleCloseSupplierServiceOrderFormWindow = useCallback(() => {
    setSupplierServiceOrderWindow(false);
    setSelectedWeplanSupplier({} as ISupplierDTO);
  }, []);

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
    return setWeplanSupplier(false);
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
          eventId={pageEvent.id}
          handleCloseWindow={handleCloseAddSupplierWindow}
          handleCreateTransactionWindow={handleCreateTransactionWindow}
          handleIsHiredDrawer={handleIsHiredDrawer}
          handleSetWeplanSupplierListWindow={handleSetWeplanSupplierListWindow}
          isHired={isHired}
          isHiredMessage={isHiredMessage}
          onHandleCloseWindow={() => handleCloseAddSupplierWindow()}
          selectedWeplanSupplier={selectedWeplanSupplier}
          supplierSubCategory={supplierSubCategory}
          weplanSupplier={weplanSupplier}
        />
      )}
      {!!isHiredDrawer && (
        <BooleanQuestionWindow
          handleWeplanUserQuestion={handleIsHiredQuestion}
          onHandleCloseWindow={() => setIsHiredDrawer(false)}
          question="Fornecedor contratado?"
        />
      )}
      {!!deleteHiredSupplierDrawer && (
        <DeleteConfirmationWindow
          handleDelete={() => handleDeleteHiredSupplier()}
          onHandleCloseWindow={() => setDeleteHiredSupplierDrawer(false)}
        />
      )}
      {!!deleteSelectedSupplierDrawer && (
        <DeleteConfirmationWindow
          handleDelete={() => handleDeleteSelectedSupplier()}
          onHandleCloseWindow={() => setDeleteSelectedSupplierDrawer(false)}
        />
      )}
      {!!selectedSupplierWindow && (
        <SelectedSupplierWindow
          isOwner={pageEvent.isOwner}
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
          handleSupplierCategory={handleSupplierCategory}
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
        />
      )}
      {supplierServiceOrderWindow && (
        <SupplierServiceOrderFormWindow
          event_id={pageEvent.id}
          supplier_id={selectedWeplanSupplier.supplier.id}
          handleCloseWindow={handleCloseSupplierServiceOrderFormWindow}
          onHandleCloseWindow={() => setSupplierServiceOrderWindow(false)}
        />
      )}
      {weplanSupplierListWindow && (
        <SuppliersListDrawer
          category={supplierCategory}
          sub_category={supplierSubCategory}
          handleSelectedSupplier={handleSetSelectedWeplanSupplier}
          onHandleSuppliersListDrawer={() =>
            setWeplanSupplierListWindow(!weplanSupplierListWindow)
          }
        />
      )}
      {!!hiredSupplierWindow && (
        <EventSupplierWindow
          isOwner={pageEvent.isOwner}
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

          {pageEvent.isOwner && (
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
                    {pageEvent.isOwner && (
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
                    {pageEvent.isOwner ? (
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
