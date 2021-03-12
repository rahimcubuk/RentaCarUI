import { ResponseModel } from '../responseModel';
import { Customer } from './customer';

export interface CustomerResonseModel extends ResponseModel {
  data: Customer[];
}
