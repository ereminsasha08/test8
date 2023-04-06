import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from './composents/order/orders.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {GoodsComponent} from './composents/goods/goods.component';

const routes: Routes = [
  { path: '', component: OrdersComponent, outlet: 'orders'},
  { path: '', component: GoodsComponent, outlet: 'goods' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ModalModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
