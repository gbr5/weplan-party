export default interface ITransactionDTO {
  id: string;
  amount: number;
  due_date: Date;
  isPaid: boolean;
}
