export default interface ITransactionDTO {
  id: string;
  value: number;
  due_date: Date;
  isPaid: boolean;
}
