import {Goods} from './goods.model';
import {Order} from './order.model';

export class OrderLine {
  id?: number;
  order?: Order;
  goods: Goods;
  count: number;
  name: string;
}
