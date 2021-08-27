import ITransactionFileDTO from './ITransactionFileDTO';

export default interface ITransactionDTO {
  id: string;
  name: string;
  category: string;
  amount: number;
  due_date: Date;
  isPaid: boolean;
  isCancelled: boolean;
  payer_id: string;
  payee_id: string;
  created_at: Date;
  updated_at: Date;
  files: ITransactionFileDTO[];
}
