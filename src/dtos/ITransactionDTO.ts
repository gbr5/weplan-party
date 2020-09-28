export default interface ITransactionDTO {
  id?: string;
  agreement_id?: string;
  amount: number;
  due_date: Date;
  isPaid: boolean;
}
