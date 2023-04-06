import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Goods} from '../model/goods.model';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  private apiBaseUrl = '/goods';

  constructor(private http: HttpClient) {
  }

  getAllGoods(): Observable<Goods[]> {
    return this.http.get<Goods[]>(`${this.apiBaseUrl}`);
  }

  getGoodsById(id: number): Observable<Goods> {
    return this.http.get<Goods>(`${this.apiBaseUrl}/${id}`);
  }

  createGoods(goods: Goods): Observable<Goods> {
    return this.http.post<Goods>(`${this.apiBaseUrl}`, goods);
  }

  updateGoods(id: number, goods: Goods): Observable<Goods> {
    return this.http.put<Goods>(`${this.apiBaseUrl}/${id}`, goods);
  }

  deleteGoods(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${id}`);
  }
}
