import ITransactionDTO from './ITransactionDTO';

export default interface ITransactionAgreementDTO {
  id: string;
  amount: number;
  number_of_installments: number;
  transactions: ITransactionDTO[];
}
