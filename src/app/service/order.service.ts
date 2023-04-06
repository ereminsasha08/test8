import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../model/order.model';
import {OrderLine} from '../model/order-line.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = '/orders';

  constructor(private http: HttpClient) {
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }


  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}`, order);
  }

  deleteOrderLine(orderId, lineId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${orderId}/positions/${lineId}`);
  }

  addOrderLine(orderId: number, orderLine: OrderLine): Observable<OrderLine> {
    return this.http.post<OrderLine>(`${this.apiUrl}/${orderId}/positions`, orderLine);
  }

  updateOrderLine(orderId: number, lineId: number, orderLine: OrderLine): Observable<OrderLine> {
    return this.http.put<OrderLine>(`${this.apiUrl}/${orderId}/positions/${lineId}`, orderLine);
  }

}
