import IEventSupplierTransactionDTO from "./IEventSupplierTransactionDTO";

export default interface IEventSupplierTransactionAgreementDTO {
  id: string;
  supplier_id: string;
  amount: number;
  number_of_installments: number;
  isCancelled: boolean;
  created_at: Date;
  updated_at: Date;
  transactions: IEventSupplierTransactionDTO[];
}
