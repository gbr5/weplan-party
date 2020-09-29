export default interface ITransactionDTO {
  id?: string;
  agreement_id?: string;
  amount: number;
  due_date: Date;
  isPaid: boolean;
  formattedDate?: string;
  difference_in_days?: number;
  supplier_name?: string;
  index?: number;
}
