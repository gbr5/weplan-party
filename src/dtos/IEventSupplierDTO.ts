import ITransactionAgreementDTO from './ITransactionAgreementDTO';
import IUserDTO from './IUserDTO';

interface IEventWeplanSupplier {
  id: string;
  weplanEventSupplier: IUserDTO;
}
export default interface ISelectedSupplierDTO {
  id: string;
  name: string;
  supplier_sub_category: string;
  weplanUser: boolean;
  eventWeplanSupplier: IEventWeplanSupplier;
  isHired: boolean;
  transactionAgreements: ITransactionAgreementDTO[];
  status?: string;
  index?: number;
}
