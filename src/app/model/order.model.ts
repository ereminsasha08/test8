import {OrderLine} from './order-line.model';

export class Order {
  id?: number;
  client: string;
  date: string;
  address: string;
  orderLines?: OrderLine[];
}

