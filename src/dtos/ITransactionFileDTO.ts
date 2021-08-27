export default interface ITransactionFileDTO {
  id: string;
  transaction_id: string;
  name: string;
  file_name: string;
  created_at: Date;
  updated_at: Date;
  url: string;
}
