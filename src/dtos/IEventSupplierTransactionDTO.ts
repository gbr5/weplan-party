import ITransactionDTO from "./ITransactionDTO";

export default interface IEventSupplierTransactionDTO {
  id: string;
  agreement_id: string;
  transaction_id: string;
  transaction: ITransactionDTO;
}
