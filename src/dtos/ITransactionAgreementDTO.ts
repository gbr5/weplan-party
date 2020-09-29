import ITransactionDTO from './ITransactionDTO';

export default interface ITransactionAgreementDTO {
  id: string;
  supplier_id?: string;
  amount: number;
  number_of_installments: number;
  transactions: ITransactionDTO[];
  status?: string;
  index?: number;
}
