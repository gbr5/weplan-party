import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import {
  FiCheckSquare,
  FiChevronRight,
  FiEdit3,
  FiHelpCircle,
  FiHome,
  FiMusic,
  FiSquare,
} from 'react-icons/fi';
import {
  MdBuild,
  MdFolderSpecial,
  MdLinkedCamera,
  MdLocalBar,
  MdLocalDining,
  MdLocalFlorist,
  MdPersonAdd,
} from 'react-icons/md';
import { Form } from '@unform/web';
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
import WindowContainer from '../WindowContainer';

import {
  Container,
  Supplier,
  BooleanNavigationButton,
  MembersWindow,
  MembersContainer,
  AddSupplierDrawer,
} from './styles';
import getValidationErrors from '../../utils/getValidationErros';
import DeleteConfirmationWindow from '../DeleteConfirmationWindow';
import BooleanQuestionWindow from '../BooleanQuestionWindow';
import Input from '../Input';

interface ICreateSupplier {
  name: string;
  supplier_sub_category: string;
}

interface ISupplierSubCategoryDTO {
  id: string;
  sub_category: string;
}

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

  const handleAddSupplier = useCallback(
    async (data: ICreateSupplier) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          name: Yup.string().required(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        if (weplanSupplier) {
          const newSupplier = await api.post(
            `events/event-suppliers/${pageEvent.id}`,
            {
              name: selectedWeplanSupplier.supplier.name,
              supplier_sub_category: supplierSubCategory,
              isHired,
              weplanUser: weplanSupplier,
            },
          );
          setSupplierServiceOrderWindow(true);
          setAddSupplierDrawer(false);
          setSupplierCategory('');
          setSupplierSubCategory('');

          handleGetSuppliers();
          handleGetHiredSuppliers();
          addToast({
            type: 'success',
            title: `${data.name} adicionado com Sucesso`,
            description:
              'Você já pode visualizar as alterações na página do seu evento.',
          });
          if (isHired) {
            handleCreateTransactionWindow(newSupplier.data);
          }
        } else {
          const newSupplier = await api.post(
            `events/event-suppliers/${pageEvent.id}`,
            {
              name: data.name,
              supplier_sub_category: supplierSubCategory,
              isHired,
              weplanUser: weplanSupplier,
            },
          );
          setAddSupplierDrawer(false);
          setSupplierCategory('');
          setSupplierSubCategory('');

          handleGetSuppliers();
          handleGetHiredSuppliers();
          addToast({
            type: 'success',
            title: `${data.name} adicionado com Sucesso`,
            description:
              'Você já pode visualizar as alterações na página do seu evento.',
          });
          if (isHired) {
            handleCreateTransactionWindow(newSupplier.data);
          }
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);
          formRef.current?.setErrors(error);
        }
        addToast({
          type: 'error',
          title: 'Erro ao selecionar fornecedor',
          description: 'Erro selecionar fornecedor, tente novamente.',
        });
      }
    },
    [
      isHired,
      pageEvent,
      addToast,
      handleGetSuppliers,
      supplierSubCategory,
      handleGetHiredSuppliers,
      handleCreateTransactionWindow,
      selectedWeplanSupplier,
      weplanSupplier,
    ],
  );

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
        <WindowContainer
          onHandleCloseWindow={() => setAddSupplierDrawer(false)}
          containerStyle={{
            zIndex: 1000,
            top: '20%',
            left: '20%',
            height: '60%',
            width: '60%',
          }}
        >
          <Form ref={formRef} onSubmit={handleAddSupplier}>
            <AddSupplierDrawer>
              <h1>Adicionar Fornecedor</h1>

              {isHiredMessage === '' ? (
                <button type="button" onClick={handleIsHiredDrawer}>
                  Contratado?
                </button>
              ) : (
                <h1>
                  <button type="button" onClick={handleIsHiredDrawer}>
                    {isHiredMessage}
                  </button>
                </h1>
              )}

              {weplanSupplier ? (
                <button
                  type="button"
                  onClick={() => handleSetWeplanSupplierListWindow(false)}
                >
                  Fornecedor WePlan
                </button>
              ) : (
                <h1>
                  <button
                    type="button"
                    onClick={() => handleSetWeplanSupplierListWindow(true)}
                  >
                    Forcecedor WePlan?
                  </button>
                </h1>
              )}
              <Input
                name="name"
                type="text"
                placeholder="Nome do fornecedor"
                containerStyle={{ height: '40px' }}
              />
              <button type="submit">
                <h3>Salvar</h3>
              </button>
            </AddSupplierDrawer>
          </Form>
        </WindowContainer>
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
        <WindowContainer
          onHandleCloseWindow={handleSupplierCategory}
          containerStyle={{
            zIndex: 99,
            top: '5%',
            left: '5%',
            height: '90%',
            width: '90%',
          }}
        >
          <h1>Categoria de Fornecedores</h1>
          <MembersWindow>
            {/* 1 */}
            <MembersContainer>
              <button
                type="button"
                onClick={() => handleSetSupplierCategory('Planning')}
              >
                <MdFolderSpecial size={50} />
                <h1>Planejamento</h1>
              </button>
              {/* 2 */}
              <button
                type="button"
                onClick={() => handleSetSupplierCategory('Event_Desing')}
              >
                <MdLocalFlorist size={50} />
                <h1>Decoração</h1>
              </button>
              {/* 3 */}
              <button
                type="button"
                onClick={() => handleSetSupplierCategory('Venue')}
              >
                <FiHome size={50} />
                <h1>Espaços e Igrejas</h1>
              </button>
              {/* </MembersContainer> */}
              {/* 4 */}
              {/* <MembersContainer> */}
              <button
                type="button"
                onClick={() => handleSetSupplierCategory('Catering')}
              >
                <MdLocalDining size={50} />
                <h1>Buffet, lanches e Doces</h1>
              </button>
              {/* 5 */}
              <button
                type="button"
                onClick={() =>
                  handleSetSupplierCategory('Film_And_Photography')
                }
              >
                <MdLinkedCamera size={50} />
                <h1>Fotos e Filmes</h1>
              </button>
              {/* 6 */}
              <button
                type="button"
                onClick={() =>
                  handleSetSupplierCategory('Entertainment_Artists')
                }
              >
                <FiMusic size={50} />
                <h1>Artistas e Entretenimento</h1>
              </button>
              {/* </MembersContainer> */}
              {/* 7 */}
              {/* <MembersContainer> */}
              <button
                type="button"
                onClick={() =>
                  handleSetSupplierCategory('Bartenders_And_Drinks')
                }
              >
                <MdLocalBar size={50} />
                <h1>Bar e Bebidas</h1>
              </button>
              {/* 8 */}
              <button
                type="button"
                onClick={() =>
                  handleSetSupplierCategory(
                    'Dance_Floors_Structures_And_Lighting',
                  )
                }
              >
                <MdBuild size={50} />
                <h1>Estruturas, Cênica e Boate</h1>
              </button>
              {/* 9 */}
              <button
                type="button"
                onClick={() => handleSetSupplierCategory('Others')}
              >
                <FiHelpCircle size={50} />
                <h1>Outros</h1>
              </button>
            </MembersContainer>
          </MembersWindow>
        </WindowContainer>
      )}
      {supplierSubCategoryWindow && (
        <WindowContainer
          onHandleCloseWindow={() => setSupplierSubCategoryWindow(false)}
          containerStyle={{
            zIndex: 100,
            top: '5%',
            left: '5%',
            height: '90%',
            width: '90%',
          }}
        >
          <h1>Sub-Categoria de Fornecedores</h1>
          <MembersWindow>
            <MembersContainer>
              {supplierSubCategories.map(subCategory => (
                <button
                  key={subCategory.id}
                  type="button"
                  onClick={() =>
                    handleAddSupplierDrawer(subCategory.sub_category)
                  }
                >
                  {/* <MdFolderSpecial size={50} /> */}
                  <h1>{subCategory.sub_category}</h1>
                </button>
              ))}
            </MembersContainer>
          </MembersWindow>
        </WindowContainer>
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
                      <strong>{sSupplier.name}</strong> <FiEdit3 size={16} />
                    </button>
                  </span>

                  {/* {sSupplier.weplanUser && (
                    <button type="button">
                      <FiUser size={24} />
                    </button>
                  )} */}

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
                        <strong>{hSupplier.name}</strong>{' '}
                        <FiChevronRight size={16} />
                      </button>
                    ) : (
                      <button type="button">
                        <strong>{hSupplier.name}</strong>{' '}
                      </button>
                    )}
                  </span>
                  {/* {hSupplier.weplanUser && (
                    <button type="button">
                      <FiUser size={24} />
                    </button>
                  )} */}
                </Supplier>
              );
            })}
        </div>
      </Container>
    </>
  );
};

export default EventSupplierSection;
