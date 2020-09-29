import ITransactionAgreementDTO from './ITransactionAgreementDTO';

export default interface ISelectedSupplierDTO {
  id: string;
  name: string;
  supplier_sub_category: string;
  isHired: boolean;
  transactionAgreement?: ITransactionAgreementDTO[];
  status?: string;
  index?: number;
}
