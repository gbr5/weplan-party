import ITransactionDTO from './ITransactionDTO';

export default interface ITransactionAgreementDTO {
  id: string;
  value: number;
  number_of_installments: number;
  transactions: ITransactionDTO[];
}
