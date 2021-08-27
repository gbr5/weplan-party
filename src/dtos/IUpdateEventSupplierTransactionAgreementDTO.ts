import ITransactionDTO from './ITransactionDTO';

export default interface IUpdateEventSupplierTransactionAgreementDTO {
  id: string;
  amount: number;
  number_of_installments: number;
  isCancelled: boolean;
  transactions?: ITransactionDTO[];
}
