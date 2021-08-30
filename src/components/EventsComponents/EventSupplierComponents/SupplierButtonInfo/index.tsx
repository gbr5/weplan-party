import React, { useState, useMemo, ReactElement } from 'react';
import { differenceInMilliseconds } from 'date-fns/esm';
import {
  FiDollarSign,
  FiLock,
  FiMail,
  FiFileText,
  FiLoader,
  FiSquare,
  FiCheckSquare,
  FiPlus,
  FiFolder,
} from 'react-icons/fi';

import { useEventSuppliers } from '../../../../hooks/eventSuppliers';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { formatBrlCurrency } from '../../../../utils/formatBrlCurrency';
import formatOnlyDate from '../../../../utils/formatOnlyDate';
import formatOnlyDateShort from '../../../../utils/formatOnlyDateShort';

import { NotificationNumber } from '../../../NotificationNumber';

import {
  Container, // 1
  SupplierConfirmationButton, // 2
  NameContainer, // 3
  RowContainer, // 3
  RowTitle, // 4
  SupplierName, // 5
  DateText, // 6
  IconContainer, // 7
  MenuButtonSection, // 8
  MenuButton, // 9
  MenuText, // 10
  FooterContainer, // 11
  NextTransactionContainer, // 12
  TransactionRow, // 13
  SectionBorder, // 14
  SectionTitleLine, // 15
  SectionTitle, // 16
  TransactionText, // 17
  SupplierNameButton, // 18
  SupplierLabel, // 19
  FieldContainer, // 20
} from './styles';
import InlineFormField from '../../../InlineFormField';

export function SupplierButtonInfo(): ReactElement {
  const { selectedEventSupplier, eventTransactions } = useEventVariables();
  const {
    handleCreateSupplierTransactionAgreementWindow,
    handleDischargingWindow,
    handleSupplierTransactionsWindow,
    handleEditSupplierCategoryWindow,
    selectSupplierCategory,
    handleSupplierTransactionAgreementsWindow,
    handleSupplierNotesWindow,
    handleSupplierFilesWindow,
    handleSupplierBudgetsWindow,
    updateEventSupplier,
  } = useEventSuppliers();

  const [loading, setLoading] = useState(false);

  async function updateSupplierIsHired(): Promise<void> {
    try {
      setLoading(true);
      selectedEventSupplier.isHired && handleDischargingWindow();
      !selectedEventSupplier.isHired &&
        handleCreateSupplierTransactionAgreementWindow();
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateSupplierName(name: string): Promise<void> {
    if (name === selectedEventSupplier.name || name === '') return;
    try {
      setLoading(true);
      await updateEventSupplier({
        ...selectedEventSupplier,
        name,
      });
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  function openSelectCategoryWindow(): void {
    selectSupplierCategory(selectedEventSupplier.supplier_sub_category);
    handleEditSupplierCategoryWindow();
  }

  const totalCost = useMemo(() => {
    return selectedEventSupplier.transactionAgreements
      .filter(agreement => !agreement.isCancelled)
      .map(agreement => Number(agreement.amount))
      .reduce((acc, cv) => acc + cv, 0);
  }, [selectedEventSupplier]);

  const nextPayment = useMemo(() => {
    const today = new Date();

    return eventTransactions
      .filter(({ transaction }) => !transaction.isPaid)
      .filter(
        ({ transaction }) => transaction.payee_id === selectedEventSupplier.id,
      )
      .sort((a, b) => {
        if (
          differenceInMilliseconds(new Date(a.transaction.due_date), today) >
          differenceInMilliseconds(new Date(b.transaction.due_date), today)
        ) {
          return 1;
        }
        if (
          differenceInMilliseconds(new Date(a.transaction.due_date), today) <
          differenceInMilliseconds(new Date(b.transaction.due_date), today)
        ) {
          return -1;
        }
        return 0;
      })[0];
  }, [selectedEventSupplier, eventTransactions]);

  const nextPaymentLate = useMemo(() => {
    return (
      !nextPayment ?? new Date(nextPayment.transaction.due_date) < new Date()
    );
  }, [nextPayment]);

  const numberOfNotes = useMemo(() => {
    return selectedEventSupplier.notes.length;
  }, [selectedEventSupplier.notes]);

  const numberOfBudgets = useMemo(() => {
    return selectedEventSupplier.budgets.length;
  }, [selectedEventSupplier]);

  const numberOfFiles = useMemo(() => {
    return selectedEventSupplier.files.length;
  }, [selectedEventSupplier]);

  const numberOfTransactions = useMemo(() => {
    let transactions = 0;
    selectedEventSupplier.transactionAgreements
      .filter(agreement => !agreement.isCancelled)
      .map(agreement => {
        return agreement.transactions.map(({ transaction }) => {
          if (!transaction.isCancelled) {
            transactions += 1;
          }
          return transaction;
        });
      });
    return transactions;
  }, [selectedEventSupplier]);

  const numberOfTransactionAgreements = useMemo(() => {
    return selectedEventSupplier.transactionAgreements.filter(
      agreement => !agreement.isCancelled,
    ).length;
  }, [selectedEventSupplier]);

  const top = '-50%';
  const left = '-20%';
  const iconSize = 30;

  return (
    <Container>
      <FieldContainer>
        <SupplierLabel>Categoria</SupplierLabel>
        <SupplierNameButton onClick={openSelectCategoryWindow}>
          <SupplierName>
            {selectedEventSupplier.supplier_sub_category}
          </SupplierName>
        </SupplierNameButton>
      </FieldContainer>
      <SectionBorder />
      <NameContainer>
        <SupplierLabel>Nome</SupplierLabel>
        <InlineFormField
          defaultValue={selectedEventSupplier.name}
          placeholder={selectedEventSupplier.name}
          handleOnSubmit={updateSupplierName}
        />
      </NameContainer>

      <SectionBorder />

      <MenuButtonSection>
        {/* <MenuButton>
          <MenuText>Agenda</MenuText>
          <IconContainer
            color={theme.color.atention_light}
          >
            <NotificationContainer>
              <NotificationNumber>0</NotificationNumber>
            </NotificationContainer>
            <Icon name="bell" />
          </IconContainer>
        </MenuButton> */}

        {selectedEventSupplier.isHired && (
          <MenuButton onClick={handleSupplierTransactionsWindow}>
            <MenuText>Transações</MenuText>
            <IconContainer color="#fee258">
              <NotificationNumber
                top={top}
                left={left}
                number={numberOfTransactions}
              />
              <FiDollarSign size={iconSize} />
            </IconContainer>
          </MenuButton>
        )}
        <MenuButton onClick={handleSupplierNotesWindow}>
          <MenuText>Notas</MenuText>
          <IconContainer color="#99aff1">
            <NotificationNumber top={top} left={left} number={numberOfNotes} />
            <FiFileText size={iconSize} />
          </IconContainer>
        </MenuButton>

        {selectedEventSupplier.isHired && (
          <MenuButton onClick={handleSupplierTransactionAgreementsWindow}>
            <MenuText>Contratos</MenuText>
            <IconContainer color="#007500">
              <NotificationNumber
                top={top}
                left={left}
                number={numberOfTransactionAgreements}
              />
              <FiLock size={iconSize} />
            </IconContainer>
          </MenuButton>
        )}

        {!selectedEventSupplier.isHired && (
          <MenuButton onClick={handleSupplierBudgetsWindow}>
            <MenuText>Orçamentos</MenuText>
            <IconContainer color="#99ff99">
              <NotificationNumber
                top={top}
                left={left}
                number={numberOfBudgets}
              />
              <FiMail size={iconSize} />
            </IconContainer>
          </MenuButton>
        )}

        <MenuButton onClick={handleSupplierFilesWindow}>
          <MenuText>Arquivos</MenuText>
          <IconContainer color="#b0b0b0">
            <NotificationNumber top={top} left={left} number={numberOfFiles} />
            <FiFolder size={iconSize} />
          </IconContainer>
        </MenuButton>

        {selectedEventSupplier.weplanUser && (
          <MenuButton>
            <MenuText>Mais</MenuText>
            <IconContainer color="#ffd899">
              <FiPlus size={iconSize} />
            </IconContainer>
          </MenuButton>
        )}
      </MenuButtonSection>

      <SectionBorder />
      {nextPayment && nextPayment.transaction.id && (
        <>
          <NextTransactionContainer>
            <SectionTitle>
              {nextPaymentLate ? 'Pagamento Atrasado' : 'Próximo pagamento'}
            </SectionTitle>
            <SectionTitleLine />
            <TransactionRow>
              {/* <TransactionText>{nextPayment.transaction.name} | </TransactionText> */}
              <TransactionText isLate={nextPaymentLate}>
                {formatBrlCurrency(nextPayment.transaction.amount)} -{' '}
                {formatOnlyDateShort(String(nextPayment.transaction.due_date))}
              </TransactionText>
              {/* <FiSquare size={iconSize} /> */}
            </TransactionRow>
          </NextTransactionContainer>
          <SectionBorder />
        </>
      )}
      {selectedEventSupplier.isHired ? (
        <>
          <NextTransactionContainer>
            <SectionTitle>Total Contratado</SectionTitle>
            <SectionTitleLine />
            <TransactionRow>
              <TransactionText isLate={false}>
                {formatBrlCurrency(totalCost)}
              </TransactionText>
            </TransactionRow>
          </NextTransactionContainer>
          <SectionBorder />
        </>
      ) : (
        <>
          <NextTransactionContainer>
            <SectionTitle>Total Orçado</SectionTitle>
            <SectionTitleLine />
            <TransactionRow>
              <TransactionText isLate={false}>
                {formatBrlCurrency(totalCost)}
              </TransactionText>
            </TransactionRow>
          </NextTransactionContainer>
          <SectionBorder />
        </>
      )}

      <RowContainer>
        <SupplierConfirmationButton
          isHired={selectedEventSupplier.isHired}
          onClick={updateSupplierIsHired}
        >
          {selectedEventSupplier.isHired ? (
            <>
              <RowTitle>Contratado</RowTitle>
              {loading ? (
                <FiLoader size={iconSize} />
              ) : (
                <FiCheckSquare size={iconSize} />
              )}
            </>
          ) : (
            <>
              <RowTitle>Contratar ?</RowTitle>
              {loading ? (
                <FiLoader size={iconSize} />
              ) : (
                <FiSquare size={iconSize} />
              )}
            </>
          )}
        </SupplierConfirmationButton>
      </RowContainer>

      <SectionBorder />

      <FooterContainer>
        <DateText>Criado dia: </DateText>
        <DateText>
          {formatOnlyDate(String(selectedEventSupplier.created_at))}
        </DateText>
      </FooterContainer>
    </Container>
  );
}
